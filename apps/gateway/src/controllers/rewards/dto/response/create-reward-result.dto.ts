import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRewardResultDto {
  @ApiProperty({
    description: '보상 ID',
    example: '682ac6c37f661f389065d0fc',
  })
  id: string;

  @ApiProperty({
    description: '이벤트 ID',
    example: '682ac6c37f661f389065d0fb',
  })
  eventId: string;

  @ApiProperty({
    description: '보상 타입',
    example: 'item',
  })
  type: string;

  @ApiProperty({
    description: '보상 수량',
    example: 1,
  })
  amount: number;

  @ApiPropertyOptional({
    description: '보상 생성 시간',
    example: '2025-05-01T12:00:00Z',
  })
  createdAt?: Date;

  @ApiPropertyOptional({
    type: Object,
    description: '보상 타입에 따라 달라지는 보상 관련 추가 정보',
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-21',
    },
  })
  metadata?: RewardMetadata;
}
