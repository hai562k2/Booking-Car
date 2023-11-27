import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DepartmentsService } from '../departments/departments.service';
import { Department } from '../departments/department.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Vehicle } from '../vehicles/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Department, Vehicle])],
  controllers: [UsersController],
  providers: [UsersService, DepartmentsService, VehiclesService, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}
