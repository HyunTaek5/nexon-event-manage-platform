import { UserRole } from '@app/common/enum/role.enum';

export class PatchUserRoleResultDto {
  id: string;
  role: UserRole;
}
