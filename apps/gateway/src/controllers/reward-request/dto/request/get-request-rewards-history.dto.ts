import { PaginationRequestDto } from '@app/common/pagination/pagination-request.dto';
import { IsDate, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';
import { Type } from 'class-transformer';

export class GetRequestRewardsHistoryDto extends PaginationRequestDto {
  @IsOptional()
  @IsMongoId({
    message: '유효하지 않은 id 형식입니다.',
  })
  eventId?: string;

  @IsOptional()
  @IsEnum(RequestStatus)
  @EnumType(RequestStatus, 'RequestStatus')
  status?: RequestStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  requestDate?: Date;
}
