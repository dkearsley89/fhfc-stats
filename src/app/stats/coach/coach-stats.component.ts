import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Coaches } from '../../model/model';

@Component({
  selector: 'app-coach-stats',
  imports: [NgIf, NgClass, NgFor, NgbTypeaheadModule],
  templateUrl: './coach-stats.component.html',
  styleUrl: './coach-stats.component.css'
})
export class CoachStatsComponent implements OnInit {
  listOfCoaches: Coaches = { coaches: [] }
  coachData: any;
  selectedCoachId: string = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCoachesData().subscribe({
      next: (data: Coaches) => {
        this.listOfCoaches = { ...data };
      },
      error: (error: any) => {
        this.error = error;
      }
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id') && params.get('id') !== '0') {
        this.selectedCoachId = params.get('id') ?? '';
        this.loadCoach(this.selectedCoachId);
      } else {
        this.coachData = null;
      }
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listOfCoaches.coaches.filter((v: { name: string; }) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 12))
    )

  formatMatches = (value: any) => value.name || '';

  selectedItem(event: any, input: any) {
    event.preventDefault();
    this.router.navigate(['stats/coach/' + event.item.id]);
    input.value = '';
    input.blur();
  }

  loadCoach(idToLoad: string) {
    this.dataService.getCoachData(idToLoad).subscribe({
      next: (data) => {
        this.coachData = { ...data }
      },
      error: (error: any) => {
        this.error = error;
      }
    });
  }

  updateUrl(event: any) {
    event.target.src = "/img/NoImage.jpg";
  }

  getYearsCoachedString(minYear: string, maxYear: string, seasons: number) {
    if (seasons == 1) {
      return minYear + " (" + seasons + " Season)";
    }
    return minYear + " - " + maxYear + " (" + seasons + " Seasons)";
  }

  formatValue(value: number) {
    if (value == 0) {
      return "-";
    }
    return value;
  }

  getTotalGames(year: any) {
    var totalGames = 0;
    for (var propertyName in year) {
      if (propertyName.includes('Games')) {
        totalGames += year[propertyName];
      }
    }
    return totalGames;
  }
}