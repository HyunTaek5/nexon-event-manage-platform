import { RequestStatus } from '@app/common/enum/request-status.enum';

export class UpdateRequestRewardsHistoryDto {
  id: string;
  status: RequestStatus;
  failedReason?: string;
}
