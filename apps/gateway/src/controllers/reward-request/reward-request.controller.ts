import {
  ConflictException,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ObjectIdValidationPipe } from '@app/common/pipe/objectId-validation.pipe';
import { CurrentUser, User } from '../../decorators/current-user.decorator';
import { catchError, firstValueFrom } from 'rxjs';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { CreateRewardRequestResultDto } from './dto/response/create-reward-request-result.dto';
import { GetRequestRewardsHistoryDto } from './dto/request/get-request-rewards-history.dto';
import { BasePaginatedDto, Paginated } from '@app/common/pagination/paginated';
import { GetRequestRewardsHistoryResultDto } from './dto/response/get-request-rewards-history-result.dto';

@Controller({ version: '1' })
export class RewardRequestController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '이벤트 보상 요청 내역 조회',
    description: '이벤트 보상 요청 내역 조회 API',
  })
  @ApiOkResponse({
    type: BasePaginatedDto<GetRequestRewardsHistoryResultDto>(
      GetRequestRewardsHistoryResultDto,
      'RequestRewardsHistoryResultDto',
    ),
  })
  @ApiBearerAuth()
  @Get('/request-rewards')
  async getRequestRewardsHistory(
    @Query() dto: GetRequestRewardsHistoryDto,
    @CurrentUser() user: User,
  ): Promise<Paginated<GetRequestRewardsHistoryResultDto>> {
    try {
      return await firstValueFrom(
        this.client
          .send('get_reward_request_history', {
            ...dto,
            userId: user.id,
            role: user.role,
          })
          .pipe(
            catchError(() => {
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
