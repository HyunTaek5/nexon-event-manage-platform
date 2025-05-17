import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardRequest,
  RewardRequestSchema,
} from './schema/reward-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RewardRequest.name,
        schema: RewardRequestSchema,
      },
    ]),
  ],
})
export class RewardRequestModule {}
