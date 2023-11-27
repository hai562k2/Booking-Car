import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException } from '@nestjs/common';
import { JwtPayLoad, JwtPayLoadWithRt } from './types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayLoad): JwtPayLoadWithRt {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    console.log(refreshToken);
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
    return {
      ...payload,
      refreshToken,
    };
  }
}
