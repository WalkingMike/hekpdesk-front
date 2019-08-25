import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { Router } from '@angular/router';
import { Topic } from '../models/topic';
import { TokenStorageService } from '../auth/services/token-storage.service';
import { Region } from '../models/region';
import { RegionService } from '../services/region.service';


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
    private regionService: RegionService
  ) { }

  ngOnInit() {
    this.getAllTopics();
    this.regionService.getRegions().subscribe(
      regs => this.regions = regs
    );
    this.authority = this.tokenStorage.getAuthority();
  }

  getAllTopics(): void {
    this.topicService.getTopics()
    .subscribe( data => this.topics = data);
  }

  showRegion(region: number): void {
    console.log(region);
    this.topicService.getTopics()
    .subscribe( data => {
      this.topics = this.topics.filter(t => t.regionID === region);
    });
  }

  deleteTopic(id: number): void {
    this.topicService.deleteTopic(id)
      .subscribe( data => {
        this.topics = this.topics.filter(t => t.id !== id);
      });
  }
}
