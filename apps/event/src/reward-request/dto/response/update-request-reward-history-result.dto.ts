import { Types } from 'mongoose';
import { RequestStatus } from '@app/common/enum/request-status.enum';

class RewardSnapshot {
  type: string;
  amount: number;
  metadata?: Record<string, any>;
}

export class UpdateRequestRewardHistoryResultDto {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  status: RequestStatus;
  rewardSnapshot: RewardSnapshot[];
  requestedAt: Date;
  createdAt?: Date;
  failedReason?: string;

  constructor(data: {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
    status: RequestStatus;
    rewardSnapshot: RewardSnapshot[];
    requestedAt: Date;
    createdAt?: Date;
    failedReason?: string;
  }) {
    this.id = data._id;
    this.userId = data.userId;
    this.eventId = data.eventId;
    this.status = data.status;
    this.rewardSnapshot = data.rewardSnapshot.map((rewardSnap) => ({
      type: rewardSnap.type,
      amount: rewardSnap.amount,
      metadata: rewardSnap.metadata,
    }));
    this.requestedAt = data.requestedAt;
    this.createdAt = data.createdAt;
    this.failedReason = data.failedReason;
  }
}
