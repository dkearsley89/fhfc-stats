import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationComponent } from './association/association.component';
import { AwardsComponent } from './awards/awards.component';
import { HomeComponent } from './home/home.component';
import { HonourComponent } from './honour/honour.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { RecordsComponent } from './records/records.component';
import { StatsComponent } from './stats/stats.component';
import { TeamOfTheDecadeComponent } from './totd/totd.component';
import { Top100Component } from './top100/top100.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'association', component: AssociationComponent },
  { path: 'awards', redirectTo: 'awards/2023', pathMatch: 'full' },
  { path: 'awards/:awardsYear', component: AwardsComponent },
  { path: 'honour', redirectTo: 'honour/A Grade', pathMatch: 'full' },
  { path: 'honour/:honourType', component: HonourComponent },
  { path: 'milestones', component: MilestonesComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'records/top100/:name', component: Top100Component },
  { path: 'stats/:statsType', component: StatsComponent },
  { path: 'stats/:statsType/:id', component: StatsComponent },
  { path: 'totd', redirectTo: 'totd/2010-2019-Senior', pathMatch: 'full' },
  { path: 'totd/:totdName', component: TeamOfTheDecadeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }