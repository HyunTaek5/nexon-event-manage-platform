import {
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { PatchUserRoleDto } from './dto/request/patch-user-role.dto';
import { PatchUserRoleResultDto } from './dto/response/patch-user-role-result.dto';
import { CurrentUser, User } from '../../decorators/current-user.decorator';
import { GetRequestUserDto } from './dto/response/get-request-user.dto';
import { JoinDto } from './dto/request/join.dto';
import { JoinResultDto } from './dto/response/join-result.dto';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '사용자 정보 조회',
    description: '사용자 정보 조회 API',
  })
  @ApiBearerAuth()
  @Get('/me')
  async getRequestUser(@CurrentUser() user: User): Promise<GetRequestUserDto> {
    return new GetRequestUserDto(user);
  }

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

  @ApiOperation({
    summary: '사용자 역할 수정',
    description: '사용자 역할 수정 API',
  })
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Patch('/:id/role')
  async patchUserRole(
    @Param('id') id: string,
    @Body() dto: PatchUserRoleDto,
  ): Promise<PatchUserRoleResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('patch_user_role', { id, ...dto }).pipe(
          catchError((err) => {
            throw err;
          }),
        ),
      );
    } catch (err) {
      throw err;
    }
  }
}
