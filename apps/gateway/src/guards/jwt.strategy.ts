import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const now = new Date();
    const expiredAt = new Date(payload.exp * 1000);

    const isTokenExpired = now > expiredAt;

    if (isTokenExpired) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    return true;
  }
}
