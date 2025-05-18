export class GetRequestUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;

  constructor(partialUser: Partial<GetRequestUserDto>) {
    this.id = partialUser.id;
    this.email = partialUser.email;
    this.firstName = partialUser.firstName;
    this.lastName = partialUser.lastName;
    this.nickname = partialUser.nickname;
  }
}
