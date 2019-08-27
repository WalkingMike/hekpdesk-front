export class User {
  id: number;
  login: string;
  password: string;
  name: string;
  email: string;
  registerDate: Date;
  roleID: number;
  regionID: number;

  constructor(
    id: number,
    login: string,
    password: string,
    name: string,
    email: string,
    registerDate: Date,
    roleID: number,
    regionID: number
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.name = name;
    this.email = email;
    this.registerDate = registerDate;
    this.roleID = roleID;
    this.regionID = regionID;
  }
}
