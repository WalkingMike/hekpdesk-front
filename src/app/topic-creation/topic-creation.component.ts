import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { TopicService } from '../services/topic.service';


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
    this.topicService.createTopic(f.value).subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
