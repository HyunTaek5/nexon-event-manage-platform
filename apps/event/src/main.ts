import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}

bootstrap();
