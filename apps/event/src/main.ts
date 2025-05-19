import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { EventServiceModule } from './event-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.EVENT_SERVICE_HOST ?? '0.0.0.0',
        port: parseInt(process.env.EVENT_SERVICE_PORT, 10),
      },
    },
  );
  await app.listen();
}

bootstrap();
