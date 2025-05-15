import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.Date, required: true })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt?: Date;
}
