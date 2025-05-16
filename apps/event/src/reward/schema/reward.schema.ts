import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class Reward extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
