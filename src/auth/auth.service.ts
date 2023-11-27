import {
  Injectable,
  Body,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth-register.dto';
import { AuthLoginDto } from './dtos/auth-login';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { DepartmentsService } from '../departments/departments.service';
import { Inject } from '@nestjs/common/decorators';
import { Tokens, JwtPayLoad } from './strategies/types';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles/roles.enum';
import { Vehicle } from '../vehicles/vehicle.entity';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private userService: UsersService,
    @Inject(DepartmentsService) private departmentsService: DepartmentsService,
    @Inject(VehiclesService) private vehiclesService: VehiclesService,
    private jwtSevice: JwtService,
  ) {}

  //Hash data

  async getTokens(id: number, username: string, role: Role) {
    const jwtPayLoad: JwtPayLoad = {
      sub: id,
      username: username,
      role: role,
    };
    const [at, rt] = await Promise.all([
      this.jwtSevice.signAsync(jwtPayLoad, {
        secret: process.env.AUTH_SECRET,
        expiresIn: '15m',
      }),

      this.jwtSevice.signAsync(jwtPayLoad, {
        secret: process.env.AUTH_SECRET,
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  //Update freshToken in database
  async updateRtHash(id: number, rt: string) {
    const hash = await argon2.hash(rt);
    await this.userService.update(id, { hashedRt: hash });
  }

  parseUserRole(role: string): Role {
    if (!Object.values(Role).includes(role as Role)) {
      throw new NotFoundException('User role not found');
    }
    return role as Role;
  }

  //Register
  async signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    const hash = await argon2.hash(dto.password);
    const departmentId = await this.departmentsService.getById(
      dto.departmentId,
    );

    if (!departmentId) {
      throw new NotFoundException('Department not found');
    }

    const vehicle = dto.vehicleId;
    console.log(vehicle);
    if (vehicle !== undefined) {
      const vehicleId = await this.vehiclesService.getById(dto.vehicleId);
      console.log(vehicleId);
      if (!vehicleId) throw new NotFoundException('Vehicle not found');
    }

    const newUser = {
      ...dto,
      password: hash,
    };
    const roleEnumValue = this.parseUserRole(newUser.role);
    const user = await this.userService.create(newUser, departmentId);

    const tokens = await this.getTokens(user.id, user.username, roleEnumValue);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  //Login

  async signinLocal(@Body() dto: AuthLoginDto): Promise<Tokens> {
    const user = await this.userService.findOne({
      username: dto.username,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await argon2.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Password incorrect!');
    }
    const roleEnumValue = this.parseUserRole(user.role);
    const tokens = await this.getTokens(user.id, user.username, roleEnumValue);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(id: number) {
    await this.userService.update(id, { hashedRt: null });
    return true;
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.userService.findOne({ id: userId });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon2.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const roleEnumValue = this.parseUserRole(user.role);
    const tokens = await this.getTokens(user.id, user.username, roleEnumValue);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
