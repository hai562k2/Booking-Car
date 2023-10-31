import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { User } from '../../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    console.log(user);
    console.log(process.env.AUTH_SECRET);

    if (!user) {
      this.logger.debug(`User ${username} not found! `);
      throw new UnauthorizedException();
    }

    if (parseInt(password) !== user.password) {
      this.logger.debug(`Invalid credentials for users ${username}`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
