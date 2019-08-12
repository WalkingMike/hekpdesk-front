import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../models/topic';
import { TopicService } from '../services/topic.service';
import { TopicFeedComponent } from '../topic-feed/topic-feed.component';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  showReply: boolean;
  addReply: boolean;

  constructor(
    private topicService: TopicService,
    private topicFeed: TopicFeedComponent,
  ) { }

  ngOnInit() {
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
