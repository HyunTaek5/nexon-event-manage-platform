import { Types } from 'mongoose';

export class CreateRewardResultDto {
  id: Types.ObjectId;
  eventId: Types.ObjectId;
  type: string;
  amount: number;
  createdAt?: Date;

  constructor(reward: {
    _id: Types.ObjectId;
    eventId: Types.ObjectId;
    type: string;
    amount: number;
    createdAt?: Date;
  }) {
    this.id = reward._id;
    this.eventId = reward.eventId;
    this.type = reward.type;
    this.amount = reward.amount;
    this.createdAt = reward.createdAt;
  }
}
