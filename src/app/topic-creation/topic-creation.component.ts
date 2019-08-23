import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/topic';
import { RegionService } from '../services/region.service';
import { Region } from '../models/region';


@Component({
  selector: 'app-topic-creation',
  templateUrl: './topic-creation.component.html',
  styleUrls: ['./topic-creation.component.css']
})
export class TopicCreationComponent implements OnInit {
  regions: Region[];
  selectedRegion: Region;

  constructor(
    private topicService: TopicService,
    private regionService: RegionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.regionService.getRegions().subscribe(
      regs => this.regions = regs
    );
  }

  onSubmit(f: NgForm) {
    const topic: Topic = new Topic();
    topic.subject = f.value.subject;
    topic.content = f.value.content;
    console.log(f.value.selectedRegion.id);
    topic.regionID = f.value.selectedRegion.id;
    topic.topicDate = new Date();
    this.topicService.createTopic(topic).subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
