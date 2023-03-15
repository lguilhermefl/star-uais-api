import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthDefaultDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  password: string;
}
