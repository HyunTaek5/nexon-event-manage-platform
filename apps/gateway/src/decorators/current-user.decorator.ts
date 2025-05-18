import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '@app/common/enum/role.enum';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: UserRole;
};

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): User =>
    context.switchToHttp().getRequest().user,
);
