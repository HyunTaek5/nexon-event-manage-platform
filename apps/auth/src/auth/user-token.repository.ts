import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { BaseRepository } from '@app/common';
import { UserToken } from './schema/user-token.schema';

@Injectable()
export class UserTokenRepository extends BaseRepository<UserToken> {
  protected readonly logger = new Logger(UserTokenRepository.name);

  constructor(
    @InjectModel(UserToken.name) userModel: Model<UserToken>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
