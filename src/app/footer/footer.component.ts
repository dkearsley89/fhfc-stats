import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LastUpdated } from '../model/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  obsLastUpdated: Observable<LastUpdated>

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.obsLastUpdated = this.dataService.getLastUpdatedDate();
  }
}