import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDefaultDto } from 'src/users/dtos/create-user-default.dto';
import { CreateUserFromProviderDto } from 'src/users/dtos/create-user-from-provider.dto';
import { AuthService } from './auth.service';
import { AuthDefaultDto } from './dtos/auth-default.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

interface RequestPayload extends Request {
  user: {
    sub: string;
    email: string;
    refreshToken: string;
  };
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDefaultDto) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: AuthDefaultDto) {
    return await this.authService.signIn(body);
  }

  @Post('provider')
  async providerSignIn(@Body() body: CreateUserFromProviderDto) {
    return await this.authService.providerSignIn(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: RequestPayload) {
    await this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: RequestPayload) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
