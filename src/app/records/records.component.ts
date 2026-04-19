import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { LegendComponent } from '../legend/legend.component';
import { Records } from '../model/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartColumn, faCircleDot, faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-records',
  imports: [RouterModule, FontAwesomeModule, NgbTooltipModule, LegendComponent, AsyncPipe],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent {
  private readonly dataService = inject(DataService);

  readonly recordsData$: Observable<Records> = this.dataService.getRecordsTop5Data();

  faChartColumn = faChartColumn;
  faCircleDot = faCircleDot;
  faCircleInfo = faCircleInfo;
  faStar = faStar;
}