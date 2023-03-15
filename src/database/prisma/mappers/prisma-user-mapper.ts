import { User as RawUser } from '@prisma/client';
import { User } from '../../../users/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      picture: user.picture,
      provider: user.provider,
      providerId: user.providerId,
      refreshToken: user.refreshToken,
      createdAt: user.createdAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      name: raw.name,
      picture: raw.picture,
      provider: raw.provider,
      providerId: raw.providerId,
      refreshToken: raw.refreshToken,
      createdAt: raw.createdAt,
    });
  }
}
