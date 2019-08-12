import { Component, OnInit, Input } from '@angular/core';
import { ReplyService } from '../services/reply.service';
import { Reply } from '../models/reply';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply: Reply;

  constructor(
    private replyService: ReplyService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  deleteReply(): void {
    this.replyService.deleteReply(this.reply.id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
