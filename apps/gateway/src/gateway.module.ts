import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './controllers/users/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { RoleStrategy } from './guards/role.strategy';
import { IRoleStrategyName } from './guards/role-strategy.interface';
import { EventController } from './controllers/events/event.controller';
import { RewardController } from './controllers/rewards/reward.controller';
import { RewardRequestController } from './controllers/reward-request/reward-request.controller';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gateway/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: parseInt(configService.get<string>('AUTH_SERVICE_PORT'), 10),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'EVENT_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: parseInt(configService.get<string>('EVENT_SERVICE_PORT'), 10),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [
    AuthController,
    EventController,
    RewardController,
    RewardRequestController,
    UserController,
  ],
  providers: [
    Logger,
    HttpLoggerMiddleware,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: IRoleStrategyName,
      useClass: RoleStrategy,
    },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
