import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/users/user.controller';
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
        imports: [ConfigModule],
        name: 'AUTH_SERVICE',
        useFactory: async (configService: ConfigService) => {
          const host = configService.get<string>('AUTH_SERVICE_HOST');
          const port = parseInt(
            configService.get<string>('AUTH_SERVICE_PORT'),
            10,
          );
          return {
            transport: Transport.TCP,
            options: { host, port },
          };
        },
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: 'EVENT_SERVICE',
        useFactory: async (configService: ConfigService) => {
          const host = configService.get<string>('EVENT_SERVICE_HOST');
          const port = parseInt(
            configService.get<string>('EVENT_SERVICE_PORT'),
            10,
          );
          return {
            transport: Transport.TCP,
            options: { host, port },
          };
        },
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
