import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { AssociationRecords } from '../model/model';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html'
})
export class AssociationComponent implements OnInit {
  associationRecordsData: AssociationRecords;
  error: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAssociationRecordData()
      .subscribe(data => {
        this.associationRecordsData = { ...data }
      },
        error => this.error = error
      );
  }

  updateUrl(event) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }
}