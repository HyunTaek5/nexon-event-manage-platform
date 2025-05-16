import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '../../../../auth/src/auth/dto/request/login.dto';
import { LoginResultDto } from '../../../../auth/src/auth/dto/response/login-result.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiOperation } from '@nestjs/swagger';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '로그인',
    description: '로그인 API',
  })
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('login_user', dto).pipe(
          catchError((err) => {
            if (err.status === 401) {
              throw new UnauthorizedException(err.message);
            }

            if (err.status === 404) {
              throw new NotFoundException(err.message);
            }
            throw err;
          }),
        ),
      );
    } catch (err) {
      throw err;
    }
  }
}
