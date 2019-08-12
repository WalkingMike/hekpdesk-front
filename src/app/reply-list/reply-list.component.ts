import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReplyService } from '../services/reply.service';
import { Reply } from '../models/reply';
import { NgForOf } from '@angular/common';
import { Topic } from '../models/topic';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {
  @Input() topic: Topic;
  replies: Reply[];

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
      .forEach(element => {
        if (element.topicID === this.topic.id) { this.replies.push(element); }
      }));
  }

  deleteReply(id: number): void {
    this.replyService.deleteReply(id)
      .subscribe( data => {
        this.replies = this.replies.filter(r => r.id !== id);
      });
  }
}
