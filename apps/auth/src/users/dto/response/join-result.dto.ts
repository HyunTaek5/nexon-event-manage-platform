export class JoinResultDto {
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  createdAt: Date;

  constructor(partial: Partial<JoinResultDto>) {
    this.email = partial.email;
    this.firstName = partial.firstName;
    this.lastName = partial.lastName;
    this.nickname = partial.nickname;
    this.role = partial.role;
    this.createdAt = partial.createdAt;
  }
}
