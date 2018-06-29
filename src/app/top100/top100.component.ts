import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data/data.service';
import { Records, Record } from '../model/record.model';

@Component({
  selector: 'app-top100',
  templateUrl: './top100.component.html'
})
export class Top100Component implements OnInit {
  recordsData: Records = { records: null } as Records;
  recordToShow: Record = { name: null, headers: { c1: null, c2: null }, data: null };
  error: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    //At some stage, need to work out how to stop a Component being re-created each time you navigate to it via a route
    //i.e everytime you navigate to a route, the variables are cleared - so I'm guessing the Component is created each time
    this.dataService.getRecordsTop100Data()
      .subscribe(data => {
        this.recordsData = { ...data }
        //console.log(this.recordsData);

        for (let record of this.recordsData.records) {
          //console.log(record);
          if (record.name === this.route.snapshot.params['name']) {
            //console.log('found a match!');
            this.recordToShow = record;
          }
        }

        //console.log(this.recordToShow);
      },
        error => this.error = error // error path
      );
  }
}