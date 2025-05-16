import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject('AUTH_SERVICE')
    private authClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; exp: number; iat: number }) {
    const now = new Date();
    const expiredAt = new Date(payload.exp * 1000);

    const isTokenExpired = now > expiredAt;

    if (isTokenExpired) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    return await firstValueFrom(
      this.authClient
        .send('valid_user', {
          userId: payload.sub,
        })
        .pipe(
          catchError((err) => {
            if (err.status === 401) {
              throw new UnauthorizedException(err.message);
            }
            throw err;
          }),
        ),
    );
  }
}
