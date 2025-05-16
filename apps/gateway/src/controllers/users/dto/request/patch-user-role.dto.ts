import { IsEnum } from 'class-validator';
import { UserRole } from '../../../../../../auth/src/users/enum/role.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';

export class PatchUserRoleDto {
  @IsEnum(UserRole)
  @EnumType(UserRole, 'UserRole')
  role: UserRole;
}
