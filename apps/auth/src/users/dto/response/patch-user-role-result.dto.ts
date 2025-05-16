import { UserRole } from '@app/common/enum/role.enum';
import { Types } from 'mongoose';

export class PatchUserRoleResultDto {
  id: Types.ObjectId;
  role: UserRole;

  constructor(id: Types.ObjectId, role: UserRole) {
    this.id = id;
    this.role = role;
  }
}
