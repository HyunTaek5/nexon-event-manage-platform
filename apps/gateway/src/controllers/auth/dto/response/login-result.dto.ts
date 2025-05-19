import { ApiProperty } from '@nestjs/swagger';

export class LoginResultDto {
  @ApiProperty({
    description: '액세스 토큰(만료기간 7일)',
    example: 'ACCESS_TOKEN',
  })
  accessToken: string;
  @ApiProperty({
    description: '리프레시 토큰(만료기간 14일)',
    example: 'REFRESH_TOKEN',
  })
  refreshToken: string;
}
