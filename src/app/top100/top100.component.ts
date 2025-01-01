import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Record } from '../model/model';

@Component({
  selector: 'app-top100',
  imports: [RouterModule, NgFor],
  templateUrl: './top100.component.html',
  styleUrl: './top100.component.css'
})
export class Top100Component implements OnInit {
  recordToShow: Record | null = { name: 'Unknown', headers: { c1: '-', c2: '-' }, data: [] };

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecordsTop100Data(this.route.snapshot.params['name'])
      .subscribe(data => {
        this.recordToShow = { ...data }
      });
  }
}