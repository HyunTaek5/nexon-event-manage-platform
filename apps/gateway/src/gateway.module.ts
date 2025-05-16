import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './controllers/users/user.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { RoleStrategy } from './guards/role.strategy';
import { IRoleStrategyName } from './guards/role-strategy.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gateway/.env',
    }),
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
      { name: 'AUTH_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [AuthController, UserController],
  providers: [
    GatewayService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: IRoleStrategyName,
      useClass: RoleStrategy,
    },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class GatewayModule {}
