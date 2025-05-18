import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';

class RewardSnapshot {
  type: string;
  amount: number;
  metadata?: Record<string, any>;
}

export class UpdateRequestRewardHistoryResultDto {
  id: string;
  userId: string;
  eventId: string;
  @EnumType(RequestStatus, 'RequestStatus')
  status: RequestStatus;
  rewardSnapshot: RewardSnapshot[];
  requestedAt: Date;
  createdAt?: Date;
  failedReason?: string;
}
