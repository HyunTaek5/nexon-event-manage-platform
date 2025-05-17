import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, SaveOptions, Types } from 'mongoose';

import { BaseRepository } from '@app/common';
import { Reward } from './schema/reward.schema';

@Injectable()
export class RewardRepository extends BaseRepository<Reward> {
  protected readonly logger = new Logger(RewardRepository.name);

  constructor(
    @InjectModel(Reward.name) rewardModel: Model<Reward>,
    @InjectConnection() connection: Connection,
  ) {
    super(rewardModel, connection);
  }

  async findOneWithEvent(id: string) {
    const results = await this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'events',
          localField: 'eventId',
          foreignField: '_id',
          as: 'event',
        },
      },
      { $unwind: { path: '$event', preserveNullAndEmptyArrays: true } },
      { $limit: 1 },
    ]);
    return results[0] || undefined;
  }

  async bulkInsert(rewards: Omit<Reward, '_id'>[], options?: SaveOptions) {
    return this.model.insertMany(rewards, options);
  }
}
