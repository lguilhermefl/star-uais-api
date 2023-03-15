import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { UsersService } from './users.service';
import { UserViewModel } from './view-models/user-view-model';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => UserViewModel.toHttp(user));
  }
}
