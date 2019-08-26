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

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.authority = this.tokenStorage.getAuthority();
  }

  getUser(login: string): void {
    this.userService.getUserByLogin(login).subscribe(usr => this.user = usr);
  }

  onSubmit(f: NgForm) {
    this.getUser(f.value.login);
  }

}
