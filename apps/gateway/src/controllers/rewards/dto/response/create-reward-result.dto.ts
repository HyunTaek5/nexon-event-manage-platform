import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRewardResultDto {
  id: string;
  eventId: string;
  type: string;
  amount: number;
  createdAt?: Date;
  @ApiPropertyOptional({
    type: Object,
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-19',
    },
  })
  metadata?: RewardMetadata;
}
