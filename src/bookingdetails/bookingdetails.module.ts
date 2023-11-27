import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetail } from './bookingdetails.entity';
import { BookingdetailsController } from './bookingdetails.controller';
import { BookingdetailsService } from './bookingdetails.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { DepartmentsModule } from '../departments/departments.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { UsersModule } from '../users/users.module';
import { Reason } from '../reasons/reason.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingDetail]),
    DepartmentsModule,
    VehiclesModule,
    UsersModule,
  ],
  controllers: [BookingdetailsController],
  providers: [BookingdetailsService, RolesGuard],
  exports: [BookingdetailsService],
})
export class BookingdetailsModule {}
