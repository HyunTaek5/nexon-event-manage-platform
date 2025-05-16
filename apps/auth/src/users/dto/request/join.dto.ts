import { IsEmail, IsString } from 'class-validator';

export class JoinDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  nickname: string;
}
