import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@app/common';
import { UserRole } from '@app/common/enum/role.enum';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class User extends BaseSchema {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ enum: UserRole, type: SchemaTypes.String })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
