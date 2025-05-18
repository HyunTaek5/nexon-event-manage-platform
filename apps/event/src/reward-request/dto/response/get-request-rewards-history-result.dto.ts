import { Types } from 'mongoose';
import { RequestStatus } from '@app/common/enum/request-status.enum';

class RewardSnapshot {
  type: string;
  amount: number;
  metadata?: Record<string, any>;
}

export class GetRequestRewardsHistoryResultDto {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  status: RequestStatus;
  rewardSnapshot: RewardSnapshot[];
  requestedAt: Date;
  createdAt?: Date;

  constructor(requestReward: {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    status: RequestStatus;
    rewardSnapshot: RewardSnapshot[];
    requestedAt: Date;
    createdAt?: Date;
  }) {
    this.id = requestReward._id;
    this.userId = requestReward.userId;
    this.eventId = requestReward.eventId;
    this.status = requestReward.status;
    this.rewardSnapshot = requestReward.rewardSnapshot.map((snapshot) => ({
      type: snapshot.type,
      amount: snapshot.amount,
      metadata: snapshot.metadata,
    }));
    this.requestedAt = requestReward.requestedAt;
    this.createdAt = requestReward.createdAt;
  }
}
