import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
