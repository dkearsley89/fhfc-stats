import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { LegendComponent } from '../legend/legend.component';
import { Record } from '../model/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleDot, faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  imports: [RouterModule, NgFor, NgIf, FontAwesomeModule, NgbTooltipModule, NgbPaginationModule, LegendComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  recordToShow: Record | null = { name: 'Unknown', info: '-', headers: { c1: '-', c2: '-' }, data: [] };
  faCircleDot = faCircleDot;
  faCircleInfo = faCircleInfo;
  faStar = faStar;
  loadedData: boolean = false;
  recordCount: number = 0;
  page = 1;
  pageSize: number = 25;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsListData(this.route.snapshot.params['name'])
      .subscribe(data => {
        this.recordToShow = { ...data }
        this.recordCount = this.recordToShow.data.length;
        this.loadedData = true;
      });
  }

  paginatedData(): any[] {
    if (!this.recordToShow?.data) {
      return [];
    }  
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;  
    return this.recordToShow.data.slice(startIndex, endIndex);
  }
}