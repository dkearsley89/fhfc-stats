import { Component, OnInit } from '@angular/core';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';

import { DataService } from '../data/data.service';
import { Records } from '../model/record.model';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  recordsData: Records = { records: null } as Records;
  error: string;
  faChartBar = faChartBar;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    //At some stage, need to work out how to stop a Component being re-created each time you navigate to it via a route
    //i.e everytime you navigate to a route, the variables are cleared - so I'm guessing the Component is created each time
    this.dataService.getRecordsTop5Data()
      .subscribe(data => {
        this.recordsData = { ...data }
        //console.log(this.recordsData);
      },
        error => this.error = error // error path
      );
  }
}