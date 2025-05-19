import { IsEnum } from 'class-validator';
import { UserRole } from '@app/common/enum/role.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchUserRoleDto {
  @ApiProperty({
    description: '변경하려는 사용자 권한',
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  @EnumType(UserRole, 'UserRole')
  role: UserRole;
}
