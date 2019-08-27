import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../models/topic';
import { TopicFeedComponent } from '../topic-feed/topic-feed.component';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { UserService } from '../services/user.service';
import { TopicService } from '../services/topic.service';
import { RegionService } from '../services/region.service';


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
  content = '';

  constructor(
    private topicFeed: TopicFeedComponent,
    private topicService: TopicService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private regionService: RegionService
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
  }

  deleteTopic(): void {
    this.topicFeed.deleteTopic(this.topic.id);
  }

  switchShowReply(): void {
    this.showReply = !this.showReply;
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
