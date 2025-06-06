import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IRoleStrategy, IRoleStrategyName } from './role-strategy.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(IRoleStrategyName)
    private readonly strategy: IRoleStrategy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublic = this.reflector.get<boolean>(
      'public',
      context.getHandler(),
    );

    try {
      const isAuthorized = await this.strategy.authorizeRole(
        context,
        requiredRoles,
        isPublic,
      );

      if (!isAuthorized) {
        throw new ForbiddenException();
      }
    } catch (err) {
      throw new ForbiddenException('해당 권한이 없습니다.');
    }

    return true;
  }
}
