import { Component, OnInit, Input } from '@angular/core';
import { ReplyService } from '../services/reply.service';
import { NgForm } from '@angular/forms';
import { Topic } from '../models/topic';
import { Reply } from '../models/reply';
import { TopicComponent } from '../topic/topic.component';


@Component({
  selector: 'app-reply-creation',
  templateUrl: './reply-creation.component.html',
  styleUrls: ['./reply-creation.component.css']
})
export class ReplyCreationComponent implements OnInit {
  @Input() topic: Topic;

  constructor(
    private replyService: ReplyService,
    private topicComp: TopicComponent,
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const reply: Reply = new Reply();
    // tslint:disable-next-line: no-string-literal
    reply.replyText = f.value['replyContent'];
    reply.replyDate = new Date();
    reply.topicID = this.topic.id;
    this.replyService.createReply(reply).subscribe();
    this.topicComp.switchAddReply();
  }
}
