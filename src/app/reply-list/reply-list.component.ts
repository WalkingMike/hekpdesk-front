import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReplyService } from '../services/reply.service';
import { Reply } from '../models/reply';
import { Topic } from '../models/topic';


@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {
  @Input() topic: Topic;
  @Input() authority: string;
  @Input() currentUserID: number;
  replies: Reply[] = [];

  constructor(
    private router: Router,
    private replyService: ReplyService,
  ) { }

  ngOnInit() {
    this.getAllReplies();
  }

  getAllReplies(): void {
    this.replyService.getReplies()
    .subscribe( data => data
      .forEach( element => {
        if (element.topicID === this.topic.id) { this.replies.push(element); }
      }));
  }

  // getAllReplies(): void {
  //   this.replies$ = this.replyService.getReplies();
  //   this.replies$.subscribe();
  // }

  // getActualReplies(): Reply[] {
  //   const replies: Reply[] = [];
  //   this.replies$.subscribe( data => data
  //     .forEach( element => {
  //       if (element.topicID === this.topic.id) { replies.push(element); }
  //     }));
  //   return replies;
  // }

  // deleteReply(id: number): void {
  //   this.replyService.deleteReply(id).subscribe();
  // }

  deleteReply(id: number): void {
    this.replyService.deleteReply(id)
      .subscribe( data => {
        this.replies = this.replies.filter(r => r.id !== id);
      });
  }
}
