import { Component, inject } from '@angular/core';
import { TitleCasePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { HomeRecords } from '../model/model';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, TitleCasePipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly dataService = inject(DataService);

  readonly recordsData$: Observable<HomeRecords> = this.dataService.getHomeRecords();

  updateUrl(event: any) {
    event.target.src = "/img/NoImage.jpg";
  }
}