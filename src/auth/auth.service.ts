import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getTokenForUser(user: User) {
    return this.jwtService.sign({ username: user.username, sub: user.id });
  }
}
