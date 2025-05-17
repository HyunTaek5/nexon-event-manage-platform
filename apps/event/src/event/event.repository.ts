import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';

import { BaseRepository } from '@app/common';
import { Event } from './schema/event.schema';
import { Paginated } from '@app/common/pagination/paginated';
import { Reward } from '../reward/schema/reward.schema';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  protected readonly logger = new Logger(EventRepository.name);

  constructor(
    @InjectModel(Event.name) eventModel: Model<Event>,
    @InjectConnection() connection: Connection,
  ) {
    super(eventModel, connection);
  }

  async findOneWithRewards(id: string): Promise<Event & { rewards: Reward[] }> {
    const results = await this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'rewards',
          localField: '_id',
          foreignField: 'eventId',
          as: 'rewards',
        },
      },
      { $limit: 1 },
    ]);
    return results[0] || undefined;
  }

  async findAllWithPagination(offset: number, limit: number) {
    const [items, totalItemCount] = await Promise.all([
      this.model
        .find()
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      this.model.countDocuments(),
    ]);

    return new Paginated<Event>(items, offset, limit, totalItemCount);
  }
}
