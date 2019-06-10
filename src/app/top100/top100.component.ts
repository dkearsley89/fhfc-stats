import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { Record } from '../model/model';

@Component({
  selector: 'app-top100',
  templateUrl: './top100.component.html'
})
export class Top100Component implements OnInit {
  recordToShow: Record;
  error: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsTop100Data(this.route.snapshot.params['name'])
      .subscribe(data => {
        this.recordToShow = { ...data }
      },
        error => this.error = error
      );
  }
}