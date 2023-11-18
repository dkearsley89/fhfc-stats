import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { YearlyAwards } from '../model/model';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  yearlyAwardsData!: YearlyAwards;
  active: string = '';
  yearsToShow: string[] = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
  yearlyAwardsTitle: string = '';
  selectedYear: string = '';

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dataService.getYearlyAwardsdData(params['awardsYear'])
        .subscribe(data => {
          this.yearlyAwardsData = { ...data };
          this.active = "A Grade";
          this.selectedYear = params['awardsYear'];
          this.updateTitle();
        });
    });
  }

  updateUrl(event: any) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }

  changeGrade(grade: string) {
    this.active = grade;
    this.updateTitle();
  }

  updateTitle() {
    this.yearlyAwardsTitle = this.selectedYear + ' ' + this.active + ' Awards';
  }
}