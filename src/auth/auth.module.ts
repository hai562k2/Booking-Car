import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../users/users.module';
import { DepartmentsModule } from '../departments/departments.module';
import { JwtAccessTokenStrategy, JwtRefreshStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Vehicle } from '../vehicles/vehicle.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DepartmentsModule,
    VehiclesModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    JwtAccessTokenStrategy,
    JwtRefreshStrategy,
    RolesGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
