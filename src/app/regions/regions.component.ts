import { Component, OnInit } from '@angular/core';
import { RegionService } from '../services/region.service';
import { Region } from '../models/region';


@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  regions: Region[];
  regionAux = new Region();

  constructor(
    private regionService: RegionService
  ) { }

  ngOnInit() {
    this.regionService.getRegions().subscribe(data => this.regions = data);
  }

  modifyRegion(reg: Region, name: string) {
    reg.region = name;
    this.regionService.createRegion(reg).subscribe(
      () => {},
      () => {},
      () => this.regionService.getRegions().subscribe(data => {this.regions = data; this.regions.sort((a, b) => a.id - b.id); }),
    );
  }
}
