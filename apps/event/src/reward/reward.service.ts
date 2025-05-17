import { Injectable } from '@nestjs/common';
import { RewardRepository } from './reward.repository';
import { CreateRewardDto } from './dto/request/create-reward.dto';
import { SaveOptions, Types } from 'mongoose';

@Injectable()
export class RewardService {
  constructor(private readonly repository: RewardRepository) {}

  async createRewards(
    eventId: Types.ObjectId,
    dto: CreateRewardDto[],
    options?: SaveOptions,
  ) {
    const rewardDocs = dto.map((reward) => ({
      ...reward,
      eventId: eventId,
      _id: new Types.ObjectId(),
    }));

    return this.repository.bulkInsert(rewardDocs, options);
  }
}
