/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDefaultDto } from './dtos/auth-default.dto';
import { CreateUserDefaultDto } from '../users/dtos/create-user-default.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserFromProviderDto } from 'src/users/dtos/create-user-from-provider.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(body: CreateUserDefaultDto): Promise<any> {
    const { email, password, name } = body;
    const userExists = await this.usersService.findByEmail(email);

    if (userExists) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = this.hashData(password);
    const newUser = await this.usersService.create({
      ...body,
      password: passwordHash,
      picture: null,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { name, picture: null, ...tokens };
  }

  async signIn(body: AuthDefaultDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) throw new BadRequestException('User does not exist');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const passwordMatches = bcrypt.compareSync(body.password, user.password!);
    if (!passwordMatches)
      throw new UnauthorizedException('Incorrect credentials');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { name: user.name, picture: user.picture, ...tokens };
  }

  async providerSignIn(body: CreateUserFromProviderDto) {
    const { email, name, picture } = body;
    const userExists = await this.usersService.findByEmail(email);

    if (!userExists) {
      const newUser = await this.usersService.create({
        ...body,
      });
      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return { name, picture, ...tokens };
    }

    const tokens = await this.getTokens(userExists!.id, userExists!.email);
    await this.updateRefreshToken(userExists!.id, tokens.refreshToken);
    return { name: userExists!.name, picture: userExists!.picture, ...tokens };
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: refreshTokenHash,
    });
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Unauthorized');

    const refreshTokenMatches = bcrypt.compareSync(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new UnauthorizedException('Unauthorized');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  hashData(data: string) {
    const SALT = 10;
    return bcrypt.hashSync(data, SALT);
  }
}
