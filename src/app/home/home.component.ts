import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Records } from '../model/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  obsHomeRecords: Observable<Records>

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.obsHomeRecords = this.dataService.getHomeRecords();
  }

  updateUrl(event) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }
}