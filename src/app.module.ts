import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/department.entity';
import { Vehicle } from './vehicles/vehicle.entity';
import { BookingdetailsModule } from './bookingdetails/bookingdetails.module';
import { BookingDetail } from './bookingdetails/bookingdetails.entity';
import { ReasonsModule } from './reasons/reasons.module';
import { Reason } from './reasons/reason.entity';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [User, Department, Vehicle, BookingDetail, Reason],
    }),
    UsersModule,
    DepartmentsModule,
    BookingdetailsModule,
    ReasonsModule,
    VehiclesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
