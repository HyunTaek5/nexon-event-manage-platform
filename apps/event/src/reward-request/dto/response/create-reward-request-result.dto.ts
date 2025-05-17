import { Types } from 'mongoose';
import { RequestStatus } from '@app/common/enum/request-status.enum';

export class CreateRewardRequestResultDto {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  status: RequestStatus;
  rewardSnapshot: {
    type: string;
    amount: number;
    metadata?: Record<string, any>;
  }[];
  requestedAt: Date;
  createdAt?: Date;

  constructor(rewardRequest: {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    status: RequestStatus;
    rewardSnapshot: {
      type: string;
      amount: number;
      metadata?: Record<string, any>;
    }[];
    requestedAt: Date;
    createdAt?: Date;
  }) {
    this.id = rewardRequest._id;
    this.userId = rewardRequest.userId;
    this.eventId = rewardRequest.eventId;
    this.status = rewardRequest.status;
    this.rewardSnapshot = rewardRequest.rewardSnapshot.map((reward) => ({
      type: reward.type,
      amount: reward.amount,
      metadata: reward?.metadata,
    }));
    this.requestedAt = rewardRequest.requestedAt;
    this.createdAt = rewardRequest?.createdAt;
  }
}
