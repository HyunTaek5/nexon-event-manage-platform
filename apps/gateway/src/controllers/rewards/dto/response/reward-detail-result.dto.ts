import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiPropertyOptional } from '@nestjs/swagger';

class Condition {
  type: string;
  value: number;
}

class Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  createdAt: Date;
}

export class RewardDetailResultDto {
  id: string;
  eventId: string;
  type: string;
  amount: number;
  @ApiPropertyOptional({
    type: Object,
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-19',
    },
  })
  metadata?: RewardMetadata;
  createdAt: Date;
  event: Event;
}
