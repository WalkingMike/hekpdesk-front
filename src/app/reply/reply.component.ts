import { Component, OnInit, Input } from '@angular/core';
import { Reply } from '../models/reply';
import { ReplyListComponent } from '../reply-list/reply-list.component';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply: Reply;

  constructor(
    private replyList: ReplyListComponent,
  ) { }

  ngOnInit() {
  }

  deleteReply(): void {
    this.replyList.deleteReply(this.reply.id);
  }

}
