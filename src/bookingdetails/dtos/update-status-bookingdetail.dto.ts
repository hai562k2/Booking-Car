import { PartialType } from '@nestjs/mapped-types';
import { IsISO8601, IsIn, IsInt, IsString, Matches } from 'class-validator';
import { CreateBookingDetailDto } from './create-bookingdetails.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusBookings } from '../status-booking.enum';

export class UpdateStatusBookingDetailDto {
  @ApiProperty({
    enum: [
      StatusBookings.CANCEL,
      StatusBookings.PENDING_ACCESS,
      StatusBookings.PENDING_CANCEL,
      StatusBookings.ACCESS,
    ],
    example: 'pending',
  })
  @IsIn(
    [
      StatusBookings.CANCEL,
      StatusBookings.PENDING_ACCESS,
      StatusBookings.PENDING_CANCEL,
      StatusBookings.ACCESS,
    ],
    {
      message: 'Invalid status',
    },
  )
  statusBooking: StatusBookings;
}
