import { ApiProperty } from '@nestjs/swagger';

export class GetRequestUserDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '682ac6c37f661f389065d0fc',
  })
  id: string;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user1@example.com',
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '넥슨',
  })
  firstName: string;

  @ApiProperty({
    description: '사용자 성',
    example: '이',
  })
  lastName: string;

  @ApiProperty({
    description: '사용자 닉네임',
    example: '유저1',
  })
  nickname: string;

  constructor(partialUser: Partial<GetRequestUserDto>) {
    this.id = partialUser.id;
    this.email = partialUser.email;
    this.firstName = partialUser.firstName;
    this.lastName = partialUser.lastName;
    this.nickname = partialUser.nickname;
  }
}
