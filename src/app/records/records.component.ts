import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Records } from '../model/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-records',
  imports: [NgFor, RouterModule, FontAwesomeModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
  recordsData!: Records;
  faChartColumn = faChartColumn;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsTop5Data()
      .subscribe(data => {
        this.recordsData = { ...data }
      });
  }
}