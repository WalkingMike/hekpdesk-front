import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../auth/services/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  authority = '';
  passType = 'password';

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.authority = this.tokenStorage.getAuthority();
    this.getUser(this.tokenStorage.getLogin());
  }

  getUser(login: string): void {
    this.userService.getUserByLogin(login).subscribe(usr => this.user = usr);
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
  }

  onUserChanges(k: NgForm) {
  }

}
