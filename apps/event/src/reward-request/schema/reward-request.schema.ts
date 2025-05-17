import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { BaseSchema } from '@app/common';
import { RequestStatus } from '@app/common/enum/request-status.enum';

@Schema({ versionKey: false })
export class RewardRequest extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({
    enum: RequestStatus,
    default: RequestStatus.PENDING,
    type: SchemaTypes.String,
  })
  status: RequestStatus;

  @Prop()
  failedReason?: string;

  @Prop({
    type: [
      {
        type: String,
        amount: Number,
        metadata: Object,
      },
    ],
  })
  rewardSnapshot: {
    type: string;
    amount: number;
    metadata: Record<string, any>;
  }[];

  @Prop()
  requestedAt: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
