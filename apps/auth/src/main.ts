import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_SERVICE_HOST ?? '0.0.0.0',
        port: parseInt(process.env.AUTH_SERVICE_PORT, 10),
      },
    },
  );
  await app.listen();
}

bootstrap();
