import { UserRole } from '@app/common/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PatchUserRoleResultDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '682ac6c37f661f389065d0fc',
  })
  id: string;

  @ApiProperty({
    description: '변경된 사용자 권한',
    example: UserRole.ADMIN,
  })
  role: UserRole;
}
