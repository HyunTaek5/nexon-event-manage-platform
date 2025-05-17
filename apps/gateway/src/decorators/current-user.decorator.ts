import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
};

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): User =>
    context.switchToHttp().getRequest().user,
);
