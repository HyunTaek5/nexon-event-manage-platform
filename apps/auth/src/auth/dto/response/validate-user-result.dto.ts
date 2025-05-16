import { UserRole } from '@app/common/enum/role.enum';
import { Types } from 'mongoose';

export class ValidateUserResultDto {
  id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: UserRole;

  constructor(_id: Types.ObjectId, partial: Partial<ValidateUserResultDto>) {
    this.id = _id;
    this.email = partial.email;
    this.firstName = partial.firstName;
    this.lastName = partial.lastName;
    this.nickname = partial.nickname;
    this.role = partial.role;
  }
}
