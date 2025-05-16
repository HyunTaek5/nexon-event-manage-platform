import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserToken, UserTokenSchema } from './schema/user-token.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserTokenRepository } from './user-token.repository';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: UserToken.name, schema: UserTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserTokenRepository],
  exports: [AuthService],
})
export class AuthModule {}
