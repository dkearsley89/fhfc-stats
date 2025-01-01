import { Component, OnInit } from '@angular/core';
import { LastUpdated } from '../model/model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  lastUpdated: LastUpdated | null = { lastUpdated: 'Unknown' };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getLastUpdatedDate()
      .subscribe(data => {
        this.lastUpdated = { ...data }
      });
  }
}