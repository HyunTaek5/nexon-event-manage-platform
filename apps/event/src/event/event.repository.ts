import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

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
}
