import { Injectable } from '@nestjs/common';
import { RewardRepository } from './reward.repository';
import { CreateRewardDto } from './dto/request/create-reward.dto';
import { SaveOptions, Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

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

  async createReward(
    eventId: Types.ObjectId,
    dto: CreateRewardDto,
    options?: SaveOptions,
  ) {
    const rewardDoc = {
      ...dto,
      eventId: eventId,
      _id: new Types.ObjectId(),
    };

    return this.repository.create(rewardDoc, options);
  }

  async getRewardById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new RpcException({
        statusCode: 400,
        message: '유효하지 않은 id 형식입니다.',
      });
    }

    const reward = await this.repository.findOneWithEvent(id);

    if (!reward) {
      throw new RpcException({
        statusCode: 404,
        message: '해당 보상 정보를 불러올 수 없습니다.',
      });
    }

    return reward;
  }
}
