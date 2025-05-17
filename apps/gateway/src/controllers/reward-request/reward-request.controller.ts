import {
  ConflictException,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ObjectIdValidationPipe } from '@app/common/pipe/objectId-validation.pipe';
import { CurrentUser, User } from '../../decorators/current-user.decorator';
import { catchError, firstValueFrom } from 'rxjs';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { CreateRewardRequestResultDto } from './dto/response/create-reward-request-result.dto';

@Controller({ version: '1' })
export class RewardRequestController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '이벤트 보상 요청',
    description: '이벤트 보상 요청 API',
    tags: ['Event'],
  })
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @Post('/events/:eventId/request-rewards')
  async createRewardRequest(
    @Param('eventId', ObjectIdValidationPipe) eventId: string,
    @CurrentUser() user: User,
  ): Promise<CreateRewardRequestResultDto> {
    try {
      return await firstValueFrom(
        this.client
          .send('create_reward_request', { eventId: eventId, userId: user.id })
          .pipe(
            catchError((err) => {
              if (err.status === 409) {
                throw new ConflictException(err.message);
              }

              if (err.status === 404) {
                throw new NotFoundException(err.message);
              }

              throw new InternalServerErrorException(
                '이벤트 보상 요청에 실패했습니다.',
              );
            }),
          ),
      );
    } catch (err) {
      throw err;
    }
  }
}
