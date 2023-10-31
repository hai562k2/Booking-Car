import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DepartmentsService } from 'src/departments/departments.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private departmentsService: DepartmentsService,
  ) {}
  @Get('/whoami')
  whoAmI() {}

  @Post('/signout')
  signOut() {}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    const department = await this.departmentsService.getById(body.departmentId);
    if (!department) return new NotFoundException('Department Not Found');
    return this.userService.create(body, department);
  }

  @Post('/signin')
  signin() {}

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return id;
  }

  @Get()
  findAllUsers() {
    return;
  }

  @Delete()
  removeUser() {}

  @Patch(':/id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return;
  }
}
