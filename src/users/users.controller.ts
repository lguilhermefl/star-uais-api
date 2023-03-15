import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserViewModel } from './view-models/user-view-model';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => UserViewModel.toHttp(user));
  }
}
