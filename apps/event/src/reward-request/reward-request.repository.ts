import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { BaseRepository } from '@app/common';
import { RewardRequest } from './schema/reward-request.schema';

@Injectable()
export class RewardRequestRepository extends BaseRepository<RewardRequest> {
  protected readonly logger = new Logger(RewardRequestRepository.name);

  constructor(
    @InjectModel(RewardRequest.name) rewardRequestModel: Model<RewardRequest>,
    @InjectConnection() connection: Connection,
  ) {
    super(rewardRequestModel, connection);
  }
}
