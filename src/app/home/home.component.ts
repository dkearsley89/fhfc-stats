import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Records } from '../model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recordsData: Records
  error: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getHomeRecords()
    .subscribe(data => {
      this.recordsData = { ...data }
    },
      error => this.error = error
    );
  }

  updateUrl(event) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }
}