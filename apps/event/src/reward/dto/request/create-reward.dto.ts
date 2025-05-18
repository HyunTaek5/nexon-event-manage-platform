import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';

export class CreateRewardDto {
  type: string;
  amount: number;
  metadata?: RewardMetadata;
}
