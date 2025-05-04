import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { LegendComponent } from '../legend/legend.component';
import { Records } from '../model/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartColumn, faCircleDot, faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-records',
  imports: [RouterModule, NgFor, NgIf, FontAwesomeModule, NgbTooltipModule, LegendComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
  recordsData!: Records;
  faChartColumn = faChartColumn;
  faCircleDot = faCircleDot;
  faCircleInfo = faCircleInfo;
  faStar = faStar;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsTop5Data()
      .subscribe(data => {
        this.recordsData = { ...data }
      });
  }
}