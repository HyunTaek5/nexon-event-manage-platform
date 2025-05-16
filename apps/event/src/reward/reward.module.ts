import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schema/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reward.name,
        schema: RewardSchema,
      },
    ]),
  ],
})
export class RewardModule {}
