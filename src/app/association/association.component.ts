import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AssociationRecords } from '../model/model';
import { RouterModule } from '@angular/router';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [RouterModule, TitleCasePipe, NgFor],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css'
})
export class AssociationComponent implements OnInit {
  associationRecordsData!: AssociationRecords;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAssociationRecordData()
      .subscribe(data => {
        this.associationRecordsData = { ...data }
      });
  }

  updateUrl(event: any) {
    event.target.src = "/img/players/NoImage.jpg";
  }
}