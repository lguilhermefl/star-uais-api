import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user';
import { UsersRepository } from './repositories/users-repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.usersRepository.create(createUserDto);
    return createdUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.usersRepository.findById(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.usersRepository.findByEmail(email);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return updatedUser;
  }
}
