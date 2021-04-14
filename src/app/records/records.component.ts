import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Records } from '../model/model';
import { faChartBar, IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  recordsData!: Records;
  faChartBar: IconDefinition = faChartBar;
  error: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsTop5Data()
      .subscribe(data => {
        this.recordsData = { ...data }
      },
        error => this.error = error
      );
  }
}