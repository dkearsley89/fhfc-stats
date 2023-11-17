import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { HomeRecords } from '../model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recordsData!: HomeRecords;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getHomeRecords()
      .subscribe(data => {
        this.recordsData = { ...data }
      });
  }

  updateUrl(event: any) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }
}