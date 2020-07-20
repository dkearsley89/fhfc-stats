import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Milestones } from '../model/model';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html'
})
export class MilestonesComponent implements OnInit {
  milestonesData: Milestones;
  milestoneToShowCount: number;
  error: string;
  showRecent: boolean = false;
  showSenior: boolean = true;
  showJunior: boolean = true;
  showClub: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMilestonesData()
      .subscribe(data => {
        this.milestonesData = { ...data }
      },
        error => this.error = error
      );
  }

  updateUrl(event) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }

  getMilestonesPlayer() {
    if (this.milestonesData) {
      var milestonesToReturn: { playerId: string, playerName: string, name: string, grade: string, type: string, amount: number }[] = [];
      for (var milestoneGroup of this.milestonesData?.milestones) {
        if ((milestoneGroup.grade == 'Club' && this.showClub) || ((milestoneGroup.grade == 'Senior' || milestoneGroup.grade == 'A Grade' || milestoneGroup.grade == 'B Grade' ||
          milestoneGroup.grade == 'C Grade' || milestoneGroup.grade == 'Open Women') && this.showSenior) || (milestoneGroup.grade == 'Junior' && this.showJunior)) {
          if (milestoneGroup.upcoming && !this.showRecent) {
            for (var milestone of milestoneGroup.upcoming) {
              milestonesToReturn.push({ playerId: milestone.Id, playerName: milestone.n, name: milestoneGroup.name, grade: milestoneGroup.grade, type: milestoneGroup.type, amount: milestone.a })
            }
          }
          if (milestoneGroup.recent && this.showRecent) {
            for (var milestone of milestoneGroup.recent) {
              milestonesToReturn.push({ playerId: milestone.Id, playerName: milestone.n, name: milestoneGroup.name, grade: milestoneGroup.grade, type: milestoneGroup.type, amount: milestone.a })
            }
          }
        }
      }
      milestonesToReturn.sort(function (a, b) { return a.playerName.localeCompare(b.playerName) });
      this.milestoneToShowCount = milestonesToReturn.length;
      return milestonesToReturn;
    }
  }

  getTitle() {
    if (this.showRecent) {
      return "Past Milestones";
    }
    return "Upcoming Milestones";
  }
}