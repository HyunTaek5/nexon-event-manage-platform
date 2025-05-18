import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RewardDetailResultDto } from './dto/response/reward-detail-result.dto';
import { CreateRewardDto } from './dto/request/create-reward.dto';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { CreateRewardResultDto } from './dto/response/create-reward-result.dto';
import { ObjectIdValidationPipe } from '@app/common/pipe/objectId-validation.pipe';
import { Public } from '../../decorators/public.decorator';

@Controller({ version: '1' })
export class RewardController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '보상 상세 조회',
    description: ' 보상 상세 조회 API',
  })
  @Public()
  @Get('rewards/:id')
  async getRewardById(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<RewardDetailResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('get_reward_by_id', id).pipe(
          catchError((err) => {
            throw err;
          }),
        ),
      );
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '이벤트 보상 등록',
    description: '이벤트 보상 등록 API',
    tags: ['Event'],
  })
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiBearerAuth()
  @Post('/events/:eventId/rewards')
  async createReward(
    @Param('eventId', ObjectIdValidationPipe) eventId: string,
    @Body() dto: CreateRewardDto,
  ): Promise<CreateRewardResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('create_reward', { eventId, dto }).pipe(
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
