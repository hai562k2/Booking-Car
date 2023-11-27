import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class AuthLoginDto {
  @ApiProperty({ example: '0988888882' })
  @Matches(/^(0[0-9]{9}|84[0-9]{9}|\+84[0-9]{9})$/, {
    message: 'User name must be a phone number',
  })
  username: string;

  @ApiProperty({ example: '123456' })
  @Matches(/\d{6}/, { message: 'Password must be 6 digits' })
  password: string;
}
