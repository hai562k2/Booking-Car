import { IsString, Matches, IsInt, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @Matches(/^(0[0-9]{9}|84[0-9]{9}|\+84[0-9]{9})$/, {
    message: 'User name must be a phone number',
  })
  username: string;

  @IsInt()
  @IsOptional()
  @Matches(/^.{6,}$/, { message: 'Password must be 6 characters of number' })
  password: string;

  @IsString()
  @Matches(/^.{3,} .*$/, {
    message: 'Text, minimum of 3 characters, must contain a space.',
  })
  @IsOptional()
  fullname: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  role: string;
}
