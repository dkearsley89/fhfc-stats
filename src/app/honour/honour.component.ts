import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
import { HonourBoard } from '../model/model';
import { Observable } from 'rxjs';
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-honour',
  templateUrl: './honour.component.html'
})
export class HonourComponent implements OnInit {
  faTrophy = faTrophy;
  faMedal = faMedal;
  obsHonourBoard: Observable<HonourBoard>

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.obsHonourBoard = this.dataService.getHonourBoardData(params['honourType']);
    });
  }
}