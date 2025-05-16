import { UserRole } from '../../../../../../auth/src/users/enum/role.enum';

export class PatchUserRoleResultDto {
  id: string;
  role: UserRole;
}
