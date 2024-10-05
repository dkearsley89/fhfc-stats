import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { HonourBoard } from '../model/model';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';
import { LegendComponent } from '../legend/legend.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-honour',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, NgFor, NgIf, LegendComponent, NgbDropdownModule],
  templateUrl: './honour.component.html',
  styleUrl: './honour.component.css'
})
export class HonourComponent implements OnInit {
  honourBoardData: HonourBoard | null = { name: 'Unknown', headers: { c1: '-', c2: '-', c3: '-', c4: '-', c5: '-' }, data: [] };
  faTrophy = faTrophy;
  faMedal = faMedal;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dataService.getHonourBoardData(params['honourType'])
        .subscribe(data => {
          this.honourBoardData = { ...data }
        });
    });
  }
}