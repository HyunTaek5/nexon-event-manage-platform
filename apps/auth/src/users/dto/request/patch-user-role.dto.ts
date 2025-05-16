import { UserRole } from '@app/common/enum/role.enum';

export class PatchUserRoleDto {
  id: string;
  role: UserRole;
}
