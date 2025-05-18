import { RequestStatus } from '@app/common/enum/request-status.enum';
import { PaginationRequestDto } from '@app/common/pagination/pagination-request.dto';
import { UserRole } from '@app/common/enum/role.enum';

export class GetRequestRewardsHistoryDto extends PaginationRequestDto {
  eventId?: string;
  status?: RequestStatus;
  requestDate?: Date;
  userId: string;
  role: UserRole;
}
