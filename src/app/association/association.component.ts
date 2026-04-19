import { Component, inject } from '@angular/core';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { AssociationRecords } from '../model/model';

@Component({
  selector: 'app-association',
  imports: [RouterModule, TitleCasePipe, AsyncPipe],
  templateUrl: './association.component.html',
  styleUrl: './association.component.css'
})
export class AssociationComponent {
  private readonly dataService = inject(DataService);

  readonly associationRecordsData$: Observable<AssociationRecords> = this.dataService.getAssociationRecordData();

  updateUrl(event: any) {
    event.target.src = "/img/NoImage.jpg";
  }
}