import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { Router } from '@angular/router';
import { Topic } from '../models/topic';
import { TokenStorageService } from '../auth/services/token-storage.service';


@Component({
  selector: 'app-topic-feed',
  templateUrl: './topic-feed.component.html',
  styleUrls: ['./topic-feed.component.css']
})
export class TopicFeedComponent implements OnInit {
  topics: Topic[];
  id: number;
  region: number;
  authority: string;

  constructor(
    private router: Router,
    private topicService: TopicService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.getAllTopics();
    this.authority = this.tokenStorage.getAuthority();
  }

  getAllTopics(): void {
    this.topicService.getTopics()
    .subscribe( data => this.topics = data);
  }

  showRegion(region: number): void {
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
