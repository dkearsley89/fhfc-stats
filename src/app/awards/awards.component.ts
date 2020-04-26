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
  yearlyAwardsData: YearlyAwards;
  error: string;
  active;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dataService.getYearlyAwardsdData(params['awardsYear'])
        .subscribe(data => {
          this.yearlyAwardsData = { ...data };
          this.active = "A Grade";
        },
          error => this.error = error
        );
    });
  }

  updateUrl(event) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }
}