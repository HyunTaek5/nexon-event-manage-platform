import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JoinDto } from '../../../../auth/src/users/dto/request/join.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { JoinResultDto } from '../../../../auth/src/users/dto/response/join-result.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '사용자 회원가입',
    description: '회원가입 API',
  })
  @Public()
  @Post('join')
  async join(@Body() dto: JoinDto): Promise<JoinResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('join_user', dto).pipe(
          catchError((err) => {
            if (err.status === 409) {
              throw new ConflictException(err.message);
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
