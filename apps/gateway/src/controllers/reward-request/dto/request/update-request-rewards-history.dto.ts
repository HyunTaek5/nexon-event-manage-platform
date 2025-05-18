import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';

export class UpdateRequestRewardsHistoryDto {
  @IsEnum(RequestStatus)
  @EnumType(RequestStatus, 'RequestStatus')
  status: RequestStatus;

  @IsOptional()
  @IsString()
  failedReason?: string;
}
