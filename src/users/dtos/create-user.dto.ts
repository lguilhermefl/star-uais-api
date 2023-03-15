export class CreateUserDto {
  email: string;
  name: string;
  password?: string;
  picture?: string | null;
  provider?: string;
  providerId?: string;
  refreshToken?: string;
}
