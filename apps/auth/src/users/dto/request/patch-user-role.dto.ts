import { UserRole } from '../../enum/role.enum';

export class PatchUserRoleDto {
  id: string;
  role: UserRole;
}
