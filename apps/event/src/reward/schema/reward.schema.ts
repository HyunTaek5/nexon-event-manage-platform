import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@app/common';
import { Types } from 'mongoose';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';

@Schema({ versionKey: false })
export class Reward extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Object })
  metadata?: RewardMetadata;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
