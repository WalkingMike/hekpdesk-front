import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { Router } from '@angular/router';
import { Topic } from '../models/topic';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { Region } from '../models/region';
import { RegionService } from '../services/region.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-topic-feed',
  templateUrl: './topic-feed.component.html',
  styleUrls: ['./topic-feed.component.css']
})
export class TopicFeedComponent implements OnInit {
  topics: Topic[];
  id: number;
  regionID: number;
  regions: Region[] = [];
  authority: string;

  constructor(
    private router: Router,
    private topicService: TopicService,
    private tokenStorage: TokenStorageService,
    private regionService: RegionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.regionService.getRegions().subscribe(
      regs => this.regions = regs
    );
    this.authority = this.tokenStorage.getAuthority();
    if (!this.tokenStorage.getToken()) {
      this.regionID = -1;
      this.showRegion(this.regionID);
    } else {
      this.userService.getUserByLogin(this.tokenStorage.getLogin()).subscribe(
        user => {if (user.regionID) { this.regionID = user.regionID; } },
        () => {},
        () => this.showRegion(this.regionID)
      );
    }
  }

  getAllTopics(): void {
    this.topicService.getTopics()
    .subscribe( data => this.topics = data);
    this.regionID = -1;
  }

  showRegion(region: number): void {
    if (region !== -1) {
      this.topicService.getTopicsByRegion(region).subscribe(
        data => this.topics = data
      );
    } else {
      this.getAllTopics();
    }
  }

  deleteTopic(id: number): void {
    this.topicService.deleteTopic(id)
      .subscribe( data => {
        this.topics = this.topics.filter(t => t.id !== id);
      });
  }
}
