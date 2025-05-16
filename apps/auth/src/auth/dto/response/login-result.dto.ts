export class LoginResultDto {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<LoginResultDto>) {
    this.accessToken = partial.accessToken;
    this.refreshToken = partial.refreshToken;
  }
}
