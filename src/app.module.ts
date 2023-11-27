import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/department.entity';
import { Vehicle } from './vehicles/vehicle.entity';
import { BookingdetailsModule } from './bookingdetails/bookingdetails.module';
import { BookingDetail } from './bookingdetails/bookingdetails.entity';
import { ReasonsModule } from './reasons/reasons.module';
import { Reason } from './reasons/reason.entity';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { config } from 'process';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DepartmentsModule,
    BookingdetailsModule,
    ReasonsModule,
    VehiclesModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController, FilesController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    FilesService,
  ],
})
export class AppModule {}
