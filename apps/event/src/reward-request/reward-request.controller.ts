import { Controller } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRewardRequestDto } from './dto/request/create-reward-request.dto';
import { CreateRewardRequestResultDto } from './dto/response/create-reward-request-result.dto';
import { GetRequestRewardsHistoryDto } from './dto/request/get-request-rewards-history.dto';
import { Paginated } from '@app/common/pagination/paginated';
import { GetRequestRewardsHistoryResultDto } from './dto/response/get-request-rewards-history-result.dto';
import { UpdateRequestRewardsHistoryDto } from './dto/request/update-request-rewards-history.dto';
import { UpdateRequestRewardHistoryResultDto } from './dto/response/update-request-reward-history-result.dto';

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

  @MessagePattern('get_reward_request_history')
  async getRequestRewardsHistory(
    data: GetRequestRewardsHistoryDto,
  ): Promise<Paginated<GetRequestRewardsHistoryResultDto>> {
    const { offset, limit, userId, role, status, eventId, requestDate } = data;
    const filterOptions = {
      status,
      eventId,
      requestDate,
    };

    const { items, meta } =
      await this.rewardRequestService.findAllWithPagination(
        offset,
        limit,
        userId,
        role,
        filterOptions,
      );

    return new Paginated<GetRequestRewardsHistoryResultDto>(
      items.map((item) => new GetRequestRewardsHistoryResultDto(item)),
      offset,
      limit,
      meta.totalItemCount,
    );
  }

  @MessagePattern('update_reward_request_history_status')
  async updateRewardRequestHistoryStatus(
    data: UpdateRequestRewardsHistoryDto,
  ): Promise<UpdateRequestRewardHistoryResultDto> {
    const { id, status, failedReason } = data;
    const updateResult =
      await this.rewardRequestService.updateRewardRequestStatus(
        id,
        status,
        failedReason,
      );

    return new UpdateRequestRewardHistoryResultDto(updateResult);
  }
}
