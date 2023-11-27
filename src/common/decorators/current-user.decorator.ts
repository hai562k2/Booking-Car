import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayLoadWithRt } from '../../auth/strategies/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayLoadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
