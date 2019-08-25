import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  getUser(login: string): void {
    this.userService.getUserByLogin(login).subscribe(usr => this.user = usr);
  }

  onSubmit(f: NgForm) {
    this.getUser(f.value.login);
  }

}
