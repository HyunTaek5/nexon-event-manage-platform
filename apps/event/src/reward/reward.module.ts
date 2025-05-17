import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schema/reward.schema';
import { RewardRepository } from './reward.repository';
import { RewardService } from './reward.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reward.name,
        schema: RewardSchema,
      },
    ]),
  ],
  providers: [RewardRepository, RewardService],
  exports: [RewardService],
})
export class RewardModule {}
