import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../models/topic';
import { TopicFeedComponent } from '../topic-feed/topic-feed.component';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  showReply: boolean;
  addReply: boolean;
  authority: string;
  currentUserID: number;

  constructor(
    private topicFeed: TopicFeedComponent,
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authority = this.tokenStorage.getAuthority();
    if (this.tokenStorage.getToken()) {
      this.userService.getUserByLogin(this.tokenStorage.getLogin())
        .subscribe(user => this.currentUserID = user.id);
    }
  }

  deleteTopic(): void {
    this.topicFeed.deleteTopic(this.topic.id);
  }

  switchShowReply(): void {
    this.showReply = ! this.showReply;
  }

  switchAddReply(): void {
    this.addReply = ! this.addReply;
  }
}
