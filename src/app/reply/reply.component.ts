import { Component, OnInit, Input } from '@angular/core';
import { Reply } from '../models/reply';
import { ReplyListComponent } from '../reply-list/reply-list.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply: Reply;
  @Input() authority: string;
  @Input() currentUserID: number;
  author: string[] = [];

  constructor(
    private replyList: ReplyListComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserNameLoginByID(this.reply.authorID).subscribe(
      data => this.author = data
    );
  }

  deleteReply(): void {
    this.replyList.deleteReply(this.reply.id);
  }

}
