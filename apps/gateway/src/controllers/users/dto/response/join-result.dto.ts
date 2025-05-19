import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@app/common/enum/role.enum';
import { EnumType } from '../../../../decorators/enum-type.decorator';

export class JoinResultDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '60d5f484f1c2b8a0b8c8e4e1',
  })
  id: string;

  @ApiProperty({
    description: '이메일',
    example: 'user2@example.com',
  })
  email: string;

  @ApiProperty({
    description: '이름',
    example: '넥슨',
  })
  firstName: string;

  @ApiProperty({
    description: '성',
    example: '구',
  })
  lastName: string;

  @ApiProperty({
    description: '닉네임',
    example: '나무늘보',
  })
  nickname: string;

  @ApiProperty({
    description: '사용자 권한',
    example: UserRole.USER,
  })
  @EnumType(UserRole, 'UserRole')
  role: UserRole;

  @ApiProperty({
    description: '사용자 생성일',
    example: '2025-05-20T00:00:00.000Z',
  })
  createdAt: Date;
}
