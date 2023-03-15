import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDefaultDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  password: string;

  @Length(1, 40)
  @IsNotEmpty()
  name: string;
}
