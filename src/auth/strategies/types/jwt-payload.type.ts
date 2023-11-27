import { Role } from '../../../roles/roles.enum';

export type JwtPayLoad = {
  username: string;
  sub: number;
  role: Role;
};
