import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
}
