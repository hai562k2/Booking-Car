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
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DepartmentsService } from '../departments/departments.service';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { User } from './user.entity';
import { infinityPagination } from '../utils/validators/infinity-pagination';
import { Vehicle } from '../vehicles/vehicle.entity';
import { VehiclesService } from '../vehicles/vehicles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Users')
@Controller('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private userService: UsersService,
    private departmentsService: DepartmentsService,
    private vehiclesService: VehiclesService,
  ) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    const department = await this.departmentsService.getById(body.departmentId);
    if (!department) return new NotFoundException('Department Not Found');

    const vehicle = body.vehicleId;
    if (vehicle !== undefined) {
      this.vehiclesService.getById(body.vehicleId);
      if (!vehicle) return new NotFoundException('Vehicle not found');
    }

    return this.userService.create(body, department);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return id;
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<User>> {
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.userService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Delete()
  removeUser() {}

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(parseInt(id), body);
  }
}
