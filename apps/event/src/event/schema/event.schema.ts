import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@app/common';

@Schema({ versionKey: false })
export class Event extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: [
      {
        type: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    default: [],
    required: true,
  })
  conditions: {
    type: string;
    value: number;
  }[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
