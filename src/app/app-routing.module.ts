import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { StatsComponent } from './stats/stats.component';
import { Top100Component } from './top100/top100.component';
import { HonourComponent } from './honour/honour.component';
import { MilestonesComponent } from './milestones/milestones.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'records', component: RecordsComponent },
  { path: 'records/top100/:name', component: Top100Component },
  { path: 'stats/:statsType', component: StatsComponent },
  { path: 'honour', redirectTo: 'honour/A Grade', pathMatch: 'full' },
  { path: 'honour/:honourType', component: HonourComponent },
  { path: 'milestones', component: MilestonesComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }