import { Types } from 'mongoose';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';

export class CreateRewardResultDto {
  id: Types.ObjectId;
  eventId: Types.ObjectId;
  type: string;
  amount: number;
  createdAt?: Date;
  metadata?: RewardMetadata;

  constructor(reward: {
    _id: Types.ObjectId;
    eventId: Types.ObjectId;
    type: string;
    amount: number;
    createdAt?: Date;
    metadata?: RewardMetadata;
  }) {
    this.id = reward._id;
    this.eventId = reward.eventId;
    this.type = reward.type;
    this.amount = reward.amount;
    this.createdAt = reward.createdAt;
    this.metadata = reward.metadata;
  }
}
