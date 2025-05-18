import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model, Types } from 'mongoose';

import { BaseRepository } from '@app/common';
import { RewardRequest } from './schema/reward-request.schema';
import { Paginated } from '@app/common/pagination/paginated';

@Injectable()
export class RewardRequestRepository extends BaseRepository<RewardRequest> {
  protected readonly logger = new Logger(RewardRequestRepository.name);

  constructor(
    @InjectModel(RewardRequest.name) rewardRequestModel: Model<RewardRequest>,
    @InjectConnection() connection: Connection,
  ) {
    super(rewardRequestModel, connection);
  }

  async findAllWithPagination(
    offset: number,
    limit: number,
    filterOptions?: FilterQuery<RewardRequest>,
  ) {
    const cleanedFilterOptions = Object.entries(filterOptions || {}).reduce(
      (filterOption, [key, value]: [key: string, value: string]) => {
        if (value !== undefined) {
          filterOption[key] = value;
          if (key.endsWith('Id')) {
            filterOption[key] = new Types.ObjectId(value);
          }

          if (key === 'requestDate') {
            delete filterOption[key];
          }
        }
        return filterOption;
      },
      {} as Record<string, any>,
    );

    const [items, totalItemCount] = await Promise.all([
      this.model
        .find(cleanedFilterOptions)
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      this.model.countDocuments(cleanedFilterOptions),
    ]);

    return new Paginated<RewardRequest>(items, offset, limit, totalItemCount);
  }
}
