import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './users/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gateway/.env',
    }),
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [UserController],
  providers: [GatewayService],
})
export class GatewayModule {}
