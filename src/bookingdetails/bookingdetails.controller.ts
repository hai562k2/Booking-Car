import {
  Controller,
  Body,
  Post,
  NotFoundException,
  Get,
  Param,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { BookingdetailsService } from './bookingdetails.service';
import { DepartmentsService } from '../departments/departments.service';
import { CreateBookingDetailDto } from './dtos/create-bookingdetails.dto';
import { VehiclesService } from '../vehicles/vehicles.service';
import { UsersService } from '../users/users.service';
import { GetCurrentUser, GetCurrentUserId } from '../common/decorators';
import { User } from '../users/user.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { BookingDetail } from './bookingdetails.entity';
import { infinityPagination } from '../utils/validators/infinity-pagination';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../roles/roles.enum';
import { UseGuards } from '@nestjs/common/decorators/core';
import { Roles } from '../common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Bookingdetails')
@ApiBearerAuth()
@Controller('bookingdetails')
export class BookingdetailsController {
  constructor(
    private bookingdetailsService: BookingdetailsService,
    private departmentsService: DepartmentsService,
    private vehiclesService: VehiclesService,
    private usersSerive: UsersService,
  ) {}

  @Post('create/:id')
  async createBookingDetail(
    @Body() body: CreateBookingDetailDto,
    @Param('id') vehicleId: string,
    @GetCurrentUserId() user: User,
  ) {
    const department = await this.departmentsService.findOne({
      name: body.departmentName,
    });
    if (!department) {
      throw new NotFoundException('Department name not found!');
    }

    console.log(typeof vehicleId);
    const vehicle = await this.vehiclesService.getById(parseInt(vehicleId));

    if (!vehicle) {
      throw new NotFoundException('Selected vehicle not found!');
    }
    return await this.bookingdetailsService.create(body, vehicle, user);
  }

  @Get('/Bookingdetails')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.BOARD, Role.HRADMIN)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<BookingDetail>> {
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.bookingdetailsService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  // @Get('/:id')
  // async findOne(@Param('id') id: string): Promise<NullableType<BookingDetail>> {
  //   const result = await this.bookingdetailsService.findOne({ id: +id,  });
  //   if(result.statusBooking !== '')
  // }

  @Patch('/access/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.HRADMIN, Role.BOARD)
  async access(@Param('id') id: string, @GetCurrentUser('role') role: Role) {
    return await this.bookingdetailsService.accessAndCancelBooking(
      parseInt(id),
      role,
    );
  }
}
