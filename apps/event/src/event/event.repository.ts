import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';

import { BaseRepository } from '@app/common';
import { Event } from './schema/event.schema';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  protected readonly logger = new Logger(EventRepository.name);

  constructor(
    @InjectModel(Event.name) eventModel: Model<Event>,
    @InjectConnection() connection: Connection,
  ) {
    super(eventModel, connection);
  }

  async findOneWithRewards(id: string) {
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
}
