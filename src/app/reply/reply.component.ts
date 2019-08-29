import { Component, OnInit, Input } from '@angular/core';
import { Reply } from '../models/reply';
import { UserService } from '../services/user.service';
import { TopicComponent } from '../topic/topic.component';


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
    private topicComp: TopicComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserNameLoginByID(this.reply.authorID).subscribe(
      data => this.author = data
    );
  }

  deleteReply(): void {
    this.topicComp.deleteReply(this.reply.id);
  }

}
