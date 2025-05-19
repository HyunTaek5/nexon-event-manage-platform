import { RequestStatus } from '@app/common/enum/request-status.enum';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class RewardSnapshot {
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
    type: Object,
    description: '보상 타입에 따라 달라지는 보상 관련 추가 정보',
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-19',
    },
  })
  metadata?: RewardMetadata;
}

export class CreateRewardRequestResultDto {
  @ApiProperty({
    description: '보상 요청 ID',
    example: '63f8b2a4e4b0c1d3f8e4b0c1d',
  })
  id: string;

  @ApiProperty({
    description: '유저 ID',
    example: '682ac6c37f661f389065d0fc',
  })
  userId: string;

  @ApiProperty({
    description: '이벤트 ID',
    example: '682ac6c37f661f389065d0fb',
  })
  eventId: string;

  @ApiProperty({
    description: '보상 요청 내역 진행 상태',
    example: RequestStatus.SUCCESS,
  })
  status: RequestStatus;

  @ApiProperty({
    description: '이벤트 보상 지급 확정 스냅샷',
    type: [RewardSnapshot],
    example: [
      {
        type: 'item',
        amount: 1,
        metadata: {
          itemCode: 'ITEM123',
          expireDate: '2025-05-19',
        },
      },
    ],
  })
  rewardSnapshot: RewardSnapshot[];

  @ApiProperty({
    description: '보상 요청일',
    example: '2025-05-21T00:00:00.000Z',
  })
  requestedAt: Date;

  @ApiProperty({
    description: '보상 요청 생성일',
    example: '2025-05-21T00:00:00.000Z',
  })
  createdAt?: Date;
}
