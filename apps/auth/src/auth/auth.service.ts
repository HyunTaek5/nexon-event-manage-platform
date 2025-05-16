import ms, { StringValue } from 'ms';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User } from '../users/schema/user.schema';
import { LoginDto } from './dto/request/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { UserTokenRepository } from './user-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userTokenRepository: UserTokenRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);

    const isAuthenticated = await compare(dto.password, user.password);

    if (!isAuthenticated) {
      throw new RpcException({
        status: 401,
        message: '이메일 또는 비밀번호가 잘못되었습니다.',
      });
    }

    const accessToken = await this.generateAccessToken(user._id);
    const refreshToken = await this.generateRefreshToken(user._id);

    const ttl = this.configService.get<StringValue>(
      'JWT_REFRESH_EXPIRATION_TIME',
    );
    const expireAt = new Date(Date.now() + ms(ttl));

    const userToken = await this.userTokenRepository.findOneOrNull({
      userId: user._id,
    });

    if (userToken) {
      await this.userTokenRepository.updateOne(userToken._id, {
        accessToken,
        refreshToken,
        expireAt,
      });
    } else {
      await this.userTokenRepository.create({
        userId: user._id,
        accessToken,
        refreshToken,
        expireAt,
      });
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(userId: Types.ObjectId): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(userId: Types.ObjectId): Promise<string> {
    const payload = {
      sub: userId,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });
  }

  async authUserWithId(id: string): Promise<User> {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new RpcException({
        status: 401,
        message: '인증에 실패했습니다.',
      });
    }

    return user;
  }
}
