import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RewardDetailResultDto } from './dto/response/reward-detail-result.dto';

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
  @ApiBearerAuth()
  @Get('rewards/:id')
  async getRewardById(@Param('id') id: string): Promise<RewardDetailResultDto> {
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
}
