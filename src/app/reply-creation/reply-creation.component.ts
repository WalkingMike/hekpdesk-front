import { Component, OnInit, Input } from '@angular/core';
import { ReplyService } from '../services/reply.service';
import { NgForm } from '@angular/forms';
import { Topic } from '../models/topic';
import { Reply } from '../models/reply';
import { TopicComponent } from '../topic/topic.component';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-reply-creation',
  templateUrl: './reply-creation.component.html',
  styleUrls: ['./reply-creation.component.css']
})
export class ReplyCreationComponent implements OnInit {
  @Input() topic: Topic;
  reply: Reply = new Reply();

  constructor(
    private replyService: ReplyService,
    private topicComp: TopicComponent,
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.reply.topicID = this.topic.id;
    this.userService.getUserByLogin(this.tokenStorage.getLogin()).subscribe(
      user => this.reply.authorID = user.id
    );
  }

  onSubmit(f: NgForm) {
    this.reply.replyText = f.value.replyContent;
    this.reply.replyDate = new Date();
    this.replyService.createReply(this.reply).subscribe(
      () => {},
      () => {},
      () => { this.topicComp.getAllReplies(); }
    );
    this.topicComp.switchAddReply();
  }
}
