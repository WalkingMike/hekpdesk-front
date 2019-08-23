export class SignUpInfo {
  name: string;
  login: string;
  email: string;
  password: string;

  constructor(name: string, login: string, email: string, password: string) {
      this.name = name;
      this.login = login;
      this.email = email;
      this.password = password;
  }
}
