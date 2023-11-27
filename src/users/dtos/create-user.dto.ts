import { IsString, Matches, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateUserDto {
  @ApiProperty({ example: '0988888880' })
  @Matches(/^(0[0-9]{9}|84[0-9]{9}|\+84[0-9]{9})$/, {
    message: 'Username must be a phone number',
  })
  username: string;

  @ApiProperty({ example: '123456' })
  @Matches(/\d{6}/, { message: 'Password must be 6 digits' })
  password: string;

  @ApiProperty({ example: 'Nguyen Van B' })
  @IsString()
  @Matches(/^.{3,} .*$/, {
    message: 'Fullname, minimum of 3 characters, must contain a space.',
  })
  fullname: string;

  @ApiProperty({ example: '🤷‍♀️' })
  @IsString()
  avatar?: string;

  @ApiProperty({ example: 'hradmin' })
  @IsString()
  role?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  departmentId: number;

  @ApiProperty({ example: null })
  @IsInt()
  @IsOptional()
  vehicleId?: number;
}
