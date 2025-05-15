import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './schema/user.schema';
import { BaseRepository } from '@app/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
