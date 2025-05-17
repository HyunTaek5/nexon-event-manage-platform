import { RequestStatus } from '@app/common/enum/request-status.enum';

class RewardSnapshot {
  type: string;
  amount: number;
  metadata?: Record<string, any>;
}

export class CreateRewardRequestResultDto {
  id: string;
  userId: string;
  eventId: string;
  status: RequestStatus;
  rewardSnapshot: RewardSnapshot[];
  requestedAt: Date;
  createdAt?: Date;
}
