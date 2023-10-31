import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingDetail } from './bookingdetails.entity';
import { BookingdetailsController } from './bookingdetails.controller';
import { BookingdetailsService } from './bookingdetails.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingDetail])],
  controllers: [BookingdetailsController],
  providers: [BookingdetailsService],
})
export class BookingdetailsModule {}
