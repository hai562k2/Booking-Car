import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsInt,
  IsEmpty,
  Matches,
  IsIn,
  IsOptional,
} from 'class-validator';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { ApiProperty, ApiQuery } from '@nestjs/swagger/dist/decorators';
import { Query } from '@nestjs/common/decorators';
import { Role } from '../../roles/roles.enum';

export class AuthDto {
  @ApiProperty({ example: '0988888880' })
  @Matches(/^(0[0-9]{9}|84[0-9]{9}|\+84[0-9]{9})$/, {
    message: 'Username must be a phone number',
  })
  username: string;

  @ApiProperty({ example: '123456' })
  @Matches(/\d{6}/, { message: 'Password must be 6 digits' })
  password: string;

  @ApiProperty({ example: 'Nguyen Van T' })
  @IsString()
  @Matches(/^.{3,} .*$/, {
    message: 'Text, minimum of 3 characters, must contain a space.',
  })
  fullname: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  departmentId: number;

  @ApiProperty({ example: 3, required: false })
  @IsInt()
  @IsOptional()
  vehicleId: number;

  @ApiProperty({ example: '🤷‍♀️' })
  @IsString()
  avatar: string;

  @ApiProperty({
    enum: ['admin', 'hradmin', 'driver', 'board'],
    example: 'driver',
  })
  @IsString()
  @IsIn(['admin', 'hradmin', 'driver', 'board'], { message: 'Invalid role' })
  role: Role;
}
