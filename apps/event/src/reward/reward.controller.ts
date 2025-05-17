import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RewardService } from './reward.service';
import { RewardDetailResultDto } from './dto/response/reward-detail-result.dto';
import { CreateRewardDto } from './dto/request/create-reward.dto';
import { Types } from 'mongoose';
import { CreateRewardResultDto } from './dto/response/create-reward-result.dto';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern('get_reward_by_id')
  async getRewardById(id: string): Promise<RewardDetailResultDto> {
    const reward = await this.rewardService.getRewardById(id);

    return new RewardDetailResultDto(reward);
  }

  @MessagePattern('create_reward')
  async createReward(data: {
    eventId: string;
    dto: CreateRewardDto;
  }): Promise<CreateRewardResultDto> {
    const { eventId, dto } = data;

    const reward = await this.rewardService.createReward(
      new Types.ObjectId(eventId),
      dto,
    );

    return new CreateRewardResultDto(reward);
  }
}
