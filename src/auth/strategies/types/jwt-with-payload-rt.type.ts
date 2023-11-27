import { JwtPayLoad } from './jwt-payload.type';

export type JwtPayLoadWithRt = JwtPayLoad & { refreshToken: string };
