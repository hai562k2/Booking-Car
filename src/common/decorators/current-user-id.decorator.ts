import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayLoad } from '../../auth/strategies/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayLoad;
    return user.sub;
  },
);
