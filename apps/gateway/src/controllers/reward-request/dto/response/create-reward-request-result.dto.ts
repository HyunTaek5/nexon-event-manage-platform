import { RequestStatus } from '@app/common/enum/request-status.enum';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';

class RewardSnapshot {
  type: string;
  amount: number;
  metadata?: RewardMetadata;
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
