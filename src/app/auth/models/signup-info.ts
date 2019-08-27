export class SignUpInfo {
  name: string;
  login: string;
  email: string;
  password: string;
  regionID: number;

  constructor(name: string, login: string, email: string, password: string, regionID: number) {
      this.name = name;
      this.login = login;
      this.email = email;
      this.password = password;
      this.regionID = regionID;
  }
}
