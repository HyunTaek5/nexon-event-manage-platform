import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthServiceModule {}
