import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRequestRewardsHistoryDto {
  @ApiProperty({
    description: '보상 요청 내역 진행 상태',
    example: RequestStatus.FAILED,
  })
  @IsEnum(RequestStatus)
  @EnumType(RequestStatus, 'RequestStatus')
  status: RequestStatus;

  @ApiPropertyOptional({
    description: '보상 지급 반려시 사유 등록',
    example: '보상 지급 반려 사유',
  })
  @IsOptional()
  @IsString()
  failedReason?: string;
}
