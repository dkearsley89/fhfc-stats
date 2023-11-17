import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Records } from '../model/model';
import { faChartColumn, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  recordsData!: Records;
  faChartColumn: IconDefinition = faChartColumn;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsTop5Data()
      .subscribe(data => {
        this.recordsData = { ...data }
      });
  }
}