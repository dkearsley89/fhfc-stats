import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { HomeRecords } from '../model/model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleCasePipe, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
    event.target.src = "/img/NoImage.jpg";
  }
}