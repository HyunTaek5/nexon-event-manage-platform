import { PaginationRequestDto } from '@app/common/pagination/pagination-request.dto';
import { IsDate, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetRequestRewardsHistoryDto extends PaginationRequestDto {
  @ApiProperty({
    description: '이벤트 ID',
    required: false,
  })
  @IsOptional()
  @IsMongoId({
    message: '유효하지 않은 id 형식입니다.',
  })
  eventId?: string;

  @ApiProperty({
    description: '보상 요청 내역 진행 상태',
  })
  @IsOptional()
  @IsEnum(RequestStatus)
  @EnumType(RequestStatus, 'RequestStatus')
  status?: RequestStatus;

  @ApiProperty({
    description: '보상 요청일',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  requestDate?: Date;
}
