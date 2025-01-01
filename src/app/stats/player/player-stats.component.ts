import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Players } from '../../model/model';

@Component({
  selector: 'app-player-stats',
  imports: [NgIf, NgClass, NgFor, NgbTypeaheadModule],
  templateUrl: './player-stats.component.html',
  styleUrl: './player-stats.component.css'
})
export class PlayerStatsComponent implements OnInit {
  listOfPlayers: Players = { players: [] }
  playerData: any;
  selectedPlayerId: string = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlayersData().subscribe({
      next: (data: Players) => {
        this.listOfPlayers = { ...data };
      },
      error: (error: any) => {
        this.error = error;
      }
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id') && params.get('id') !== '0') {
        this.selectedPlayerId = params.get('id') ?? '';
        this.loadPlayer(this.selectedPlayerId);
      } else {
        this.playerData = null;
      }
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listOfPlayers.players.filter((v: { name: string; }) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 12))
    );

  formatMatches = (value: any) => value.name || '';

  selectedItem(event: any, input: any) {
    event.preventDefault();
    this.router.navigate(['stats/player/' + event.item.id]);
    input.value = '';
    input.blur();
  }

  loadPlayer(idToLoad: string) {
    this.dataService.getPlayerData(idToLoad).subscribe({
      next: (data) => {
        this.playerData = { ...data }
      },
      error: (error: any) => {
        this.error = error;
      }
    });
  }

  updateUrl(event: any) {
    event.target.src = "/img/NoImage.jpg";
  }

  getYearsPlayedString(minYear: string, maxYear: string, seasons: number) {
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

  getTotalGoals(year: any) {
    var totalGoals = 0;
    for (var propertyName in year) {
      if (propertyName.includes('Goals')) {
        totalGoals += year[propertyName];
      }
    }
    return totalGoals;
  }
}