import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/topic';


@Component({
  selector: 'app-topic-creation',
  templateUrl: './topic-creation.component.html',
  styleUrls: ['./topic-creation.component.css']
})
export class TopicCreationComponent implements OnInit {

  constructor(
    private topicService: TopicService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const topic: Topic = new Topic();
    topic.subject = f.value.subject;
    topic.content = f.value.content;
    topic.topicDate = new Date();
    this.topicService.createTopic(f.value).subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
