import { Controller } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRewardRequestDto } from './dto/request/create-reward-request.dto';
import { CreateRewardRequestResultDto } from './dto/response/create-reward-request-result.dto';

@Controller()
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @MessagePattern('create_reward_request')
  async createRewardRequest(
    data: CreateRewardRequestDto,
  ): Promise<CreateRewardRequestResultDto> {
    const { eventId, userId } = data;
    const rewardRequest = await this.rewardRequestService.createRewardRequest(
      eventId,
      userId,
    );

    return new CreateRewardRequestResultDto(rewardRequest);
  }
}
