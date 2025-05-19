import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Condition {
  @ApiProperty({
    description: '조건 타입',
    example: 'login_days',
  })
  type: string;

  @ApiProperty({
    description: '조건 값',
    example: 7,
  })
  value: number;
}

class Event {
  @ApiProperty({
    description: '이벤트 ID',
    example: '682ac6c37f661f389065d0fb',
  })
  id: string;

  @ApiProperty({
    description: '이벤트 이름',
    example: '7일 연속 출석체크 이벤트',
  })
  title: string;

  @ApiProperty({
    description: '이벤트 설명',
    example: '7일 연속 출석체크를 완료하면 보상을 드립니다.',
  })
  description: string;

  @ApiProperty({
    description: '이벤트 시작일',
    example: '2025-05-01T00:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: '이벤트 종료일',
    example: '2025-05-31T23:59:59.999Z',
  })
  endDate: Date;

  @ApiProperty({
    description: '이벤트 진행 여부',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: '이벤트 조건',
    type: [Condition],
    example: [
      {
        type: 'login_days',
        value: 7,
      },
    ],
  })
  conditions: Condition[];

  @ApiProperty({
    description: '이벤트 생성일',
    example: '2025-05-01T00:00:00.000Z',
  })
  createdAt: Date;
}

export class RewardDetailResultDto {
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
    type: Object,
    description: '보상 타입에 따라 달라지는 보상 관련 추가 정보',
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-19',
    },
  })
  metadata?: RewardMetadata;

  @ApiPropertyOptional({
    description: '보상 생성 시간',
    example: '2025-05-01T12:00:00Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: '이벤트 정보',
    type: Event,
  })
  event: Event;
}
