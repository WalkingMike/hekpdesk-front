import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { RegionService } from '../services/region.service';
import { Region } from '../models/region';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  authority = '';
  passType = 'password';
  regions: Region[];

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private regionService: RegionService
  ) { }

  ngOnInit() {
    this.authority = this.tokenStorage.getAuthority();
    this.getUser(this.tokenStorage.getLogin());
    this.regionService.getRegions().subscribe(data => this.regions = data);
  }

  getUser(login: string): void {
    this.userService.getUserByLogin(login).subscribe(usr => this.user = usr);
    if (!this.user) { this.user = new User(null, '', '', '', '', null, null, null); }
  }

  getRegionName(id: number): string {
    if (this.user.regionID) {
      return this.regions.filter(reg => reg.id === id)[0].region;
    } else {
      return '';
    }
  }

  onFindUser(f: NgForm) {
    this.getUser(f.value.login);
  }

  visiblePass(): void {
    if (this.passType === 'password') {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }

  onAdminChanges(g: NgForm) {
    console.log(g.value.name !== '');
  }

  onUserChanges(k: NgForm) {
  }

}
