import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { User } from '../../users/user.entity';
import { BookingDetail } from '../../bookingdetails/bookingdetails.entity';

export class CreateReasonDto {
  @IsNumber()
  id: number;

  @IsString()
  reason_cancel_department: string;

  @IsDate()
  time_cancel: Date;

  @IsDate()
  time_booking_department: Date;

  @IsOptional()
  @IsNumber()
  reason_cancel_reviewer: number;

  @IsOptional()
  @IsDate()
  time_cancel_reviewer: Date;

  @IsOptional()
  @IsDate()
  time_booking_reviwer: Date;
}
