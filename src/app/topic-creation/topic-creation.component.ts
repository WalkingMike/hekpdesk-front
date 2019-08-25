import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/topic';
import { RegionService } from '../services/region.service';
import { Region } from '../models/region';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/services/token-storage.service';


@Component({
  selector: 'app-topic-creation',
  templateUrl: './topic-creation.component.html',
  styleUrls: ['./topic-creation.component.css']
})
export class TopicCreationComponent implements OnInit {
  regions: Region[];
  selectedRegion: Region;
  topic: Topic = new Topic();

  constructor(
    private topicService: TopicService,
    private regionService: RegionService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.regionService.getRegions().subscribe(
      regs => this.regions = regs
    );
    this.userService.getUserByLogin(this.tokenStorage.getLogin()).subscribe(
      user => this.topic.creatorID = user.id
    );
  }

  onSubmit(f: NgForm) {
    this.topic.subject = f.value.subject;
    this.topic.content = f.value.content;
    this.topic.regionID = f.value.selectedRegion.id;
    this.topic.topicDate = new Date();
    this.topicService.createTopic(this.topic).subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
