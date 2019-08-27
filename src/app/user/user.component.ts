import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { RegionService } from '../services/region.service';
import { Region } from '../models/region';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  authority = '';
  user: User;
  regions: Region[] = [];
  roles: Role[] = [];

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private regionService: RegionService,
    private roleService: RoleService,
  ) { }

  ngOnInit() {
    this.user = new User();
    this.user.regionID = 0;
    const aux1 = new Region();
    aux1.id = 0;
    aux1.region = 'Filler';
    this.regions.push(aux1);
    const aux2 = new Role();
    aux2.id = 0;
    aux2.roleDescription = 'lurker';
    this.roles.push(aux2);
    this.authority = this.tokenStorage.getAuthority();
    this.getUser(this.tokenStorage.getLogin());
    this.regionService.getRegions().subscribe(data => this.regions = data);
    this.roleService.getRoles().subscribe(data => this.roles = data);
  }

  getUser(login: string): void {
    this.userService.getUserByLogin(login).subscribe(usr => this.user = usr);
  }

  getRegionName(id: number): string {
    if (this.user.regionID) {
      return this.regions.filter(reg => reg.id === id).pop().region;
    } else {
      return '';
    }
  }

  getRoleName(id: number): string {
    if (this.user.roleID) {
      return this.roles.filter(rol => rol.id === id).pop().roleDescription;
    } else {
      return '';
    }
  }

  onFindUser(f: NgForm) {
    this.getUser(f.value.login);
  }

  onAdminChanges(g: NgForm) {
    const user = JSON.parse(JSON.stringify(this.user));
    if (g.value.name && g.value.name !== this.user.name) {
      user.name = g.value.name;
    }
    if (g.value.password) {
      user.password = g.value.password;
    } else { user.password = ' '; }
    if (g.value.regionID && g.value.regionID !== this.user.regionID) {
      user.regionID = g.value.regionID;
    }
    if (g.value.roleID && g.value.roleID !== this.user.roleID) {
      user.roleID = g.value.roleID;
    }
    this.userService.createUser(user).subscribe(
      () => {},
      () => {},
      () => this.getUser(this.user.login)
    );
  }

  onUserChanges(k: NgForm) {
    const user = JSON.parse(JSON.stringify(this.user));
    if (k.value.name && k.value.name !== this.user.name) {
      user.name = k.value.name;
    }
    if (k.value.password) {
      user.password = k.value.password;
    } else { user.password = ' '; }
    if (k.value.regionID && k.value.regionID !== this.user.regionID) {
      user.regionID = k.value.regionID;
    }
    this.userService.createUser(user).subscribe(
      () => {},
      () => {},
      () => this.getUser(this.user.login)
    );
  }

}
