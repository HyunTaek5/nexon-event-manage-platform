import { Types } from 'mongoose';

export class JoinResultDto {
  id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  createdAt: Date;

  constructor(partial: {
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    role: string;
    createdAt?: Date;
  }) {
    this.id = partial._id;
    this.email = partial.email;
    this.firstName = partial.firstName;
    this.lastName = partial.lastName;
    this.nickname = partial.nickname;
    this.role = partial.role;
    this.createdAt = partial.createdAt;
  }
}
