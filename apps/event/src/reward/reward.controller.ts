import { Controller } from '@nestjs/common';
import { RewardService } from './reward.service';
import { MessagePattern } from '@nestjs/microservices';
import { RewardDetailResultDto } from './dto/response/reward-detail-result.dto';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern('get_reward_by_id')
  async getRewardById(id: string): Promise<RewardDetailResultDto> {
    const reward = await this.rewardService.getRewardById(id);

    return new RewardDetailResultDto(reward);
  }
}
