import { User } from '../entities/user';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      name: user.name,
      email: user.email,
    };
  }
}
