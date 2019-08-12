import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

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
    this.getUser(10);
  }

  getUser(id: number): void {
    this.userService.getUserByID(id).subscribe(usr => this.user = usr);
  }

}
