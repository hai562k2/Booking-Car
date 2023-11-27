import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth-register.dto';
import { AuthLoginDto } from './dtos/auth-login';
import { Tokens } from './strategies/types';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { AccessTokenGuard } from '../common/guards';
import { RefreshTokenGuard } from '../common/guards';
import { Role } from '../roles/roles.enum';
import {
  GetCurrentUserId,
  GetCurrentUser,
  Public,
  Roles,
} from '../common/decorators';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  @Public()
  signupLocal(@Body() body: AuthDto): Promise<Tokens> {
    // this.authService.signupLocal()
    return this.authService.signupLocal(body);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/signin')
  singinLocal(@Body() body: AuthLoginDto): Promise<Tokens> {
    return this.authService.signinLocal(body);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/logout')
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    console.log(userId);
    console.log(refreshToken);
    return this.authService.refreshToken(userId, refreshToken);
  }
}
