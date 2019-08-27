import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../models/topic';
import { TopicFeedComponent } from '../topic-feed/topic-feed.component';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Region } from '../models/region';
import { TopicService } from '../services/topic.service';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  @Input() regions: Region[];
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
    private userService: UserService
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
    this.regions.forEach( reg => {
      if (this.topic.regionID === reg.id) { this.topicRegion = reg.region; }
    });
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
