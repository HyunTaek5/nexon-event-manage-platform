import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinDto {
  @ApiProperty({
    description: '이메일',
    example: 'user2@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: '이름',
    example: '넥슨',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: '성',
    example: '구',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: '닉네임',
    example: '나무늘보',
  })
  @IsString()
  nickname: string;
}
