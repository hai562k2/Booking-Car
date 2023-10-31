import { IsString, Matches, IsInt } from 'class-validator';

export class CreateUserDto {
  @Matches(/^(0[0-9]{9}|84[0-9]{9}|\+84[0-9]{9})$/, {
    message: 'User name must be a phone number',
  })
  username: string;

  @Matches(/\d{6}/, { message: 'Password must be 6 digits' })
  password: number;

  @IsString()
  @Matches(/^.{3,} .*$/, {
    message: 'Text, minimum of 3 characters, must contain a space.',
  })
  fullname: string;

  @IsString()
  avatar: string;

  @IsString()
  role: string;

  @IsInt()
  departmentId: number;
}
