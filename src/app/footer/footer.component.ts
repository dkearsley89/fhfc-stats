import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LastUpdated } from '../model/model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  lastUpdated: LastUpdated;
  error: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getLastUpdatedDate()
      .subscribe(data => {
        this.lastUpdated = { ...data }
      },
        error => this.error = error
      );
  }
}