import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { HonourBoard } from '../model/model';
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-honour',
  templateUrl: './honour.component.html'
})
export class HonourComponent implements OnInit {
  honourBoardData: HonourBoard;
  faTrophy = faTrophy;
  faMedal = faMedal;
  error: string;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dataService.getHonourBoardData(params['honourType'])
        .subscribe(data => {
          this.honourBoardData = { ...data }
        },
          error => this.error = error
        );
    });
  }
}