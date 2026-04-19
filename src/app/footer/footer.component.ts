import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { LastUpdated } from '../model/model';


@Component({
  selector: 'app-footer',
  imports: [AsyncPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private readonly dataService = inject(DataService);

  readonly lastUpdated$: Observable<LastUpdated> = this.dataService.getLastUpdatedDate();
}