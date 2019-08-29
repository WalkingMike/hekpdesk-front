import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../models/topic';
import { TopicFeedComponent } from '../topic-feed/topic-feed.component';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { UserService } from '../services/user.service';
import { TopicService } from '../services/topic.service';
import { RegionService } from '../services/region.service';
import { Reply } from '../models/reply';
import { ReplyService } from '../services/reply.service';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  topicRegion = '';
  showReply = false;
  addReply = false;
  editMode = false;
  authority: string;
  currentUserID: number;
  creator: string[] = [];
  replies: Reply[] = [];
  content = '';

  constructor(
    private topicFeed: TopicFeedComponent,
    private topicService: TopicService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private regionService: RegionService,
    private replyService: ReplyService
  ) { }

  ngOnInit() {
    this.authority = this.tokenStorage.getAuthority();
    if (this.tokenStorage.getToken()) {
      this.userService.getUserByLogin(this.tokenStorage.getLogin())
        .subscribe(user => this.currentUserID = user.id);
    }
    this.userService.getUserNameLoginByID(this.topic.creatorID).subscribe(
      data => this.creator = data
    );
    this.regionService.getRegions().subscribe(
      regs => this.topicRegion = regs.filter(reg => reg.id === this.topic.regionID)[0].region
    );
    this.content = this.topic.content;
    this.getAllReplies();
  }

  deleteTopic(): void {
    this.topicFeed.deleteTopic(this.topic.id);
  }

  switchShowReply(): void {
    this.showReply = !this.showReply;
  }

  getAllReplies(): void {
    this.replyService.getRepliesByTopic(this.topic.id)
    .subscribe( data => this.replies = data );
  }

  deleteReply(id: number): void {
    this.replyService.deleteReply(id)
      .subscribe( data => {
        this.replies = this.replies.filter(r => r.id !== id);
      });
  }

  switchAddReply(): void {
    this.addReply = !this.addReply;
  }

  switchEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveEdit(): void {
    this.topicService.editTopicContent(this.topic.id, this.content).subscribe();
    this.switchEditMode();
  }

}
