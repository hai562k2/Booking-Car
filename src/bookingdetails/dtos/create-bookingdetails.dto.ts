import {
  IsString,
  IsInt,
  IsNumber,
  IsISO8601,
  Matches,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateBookingDetailDto {
  
  @ApiProperty({ example: 'Booking request' })
  @IsString()
  @Matches(/^.{3,} .*$/, {
    message: 'Text, minimum of 3 characters, must contain a space.',
  })
  request: string;

  @ApiProperty({ example: 'HCNS' })
  @IsString()
  departmentName: string;

  @ApiProperty({ example: '2023-11-20T08:00:00.000Z' })
  @IsISO8601()
  timeStart: Date;

  @ApiProperty({ example: '2023-11-20T08:00:00.000Z' })
  @IsISO8601()
  timeEnd: Date;

  @ApiProperty({ example: 'Start Location' })
  @IsString()
  locationStart: string;

  @ApiProperty({ example: 'End Location' })
  @IsString()
  locationEnd: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  numberPassenger: number;

  @ApiProperty({ example: 'Position' })
  @IsString()
  positionTitle: string;

  @ApiProperty({ example: 'Area' })
  @IsString()
  area: string;

  @ApiProperty({ example: 'Reason for booking' })
  @IsString()
  reasonBooking: string;

}


