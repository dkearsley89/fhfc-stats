import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociationComponent } from './association/association.component';
import { HomeComponent } from './home/home.component';
import { HonourComponent } from './honour/honour.component';
import { RecordsComponent } from './records/records.component';
import { StatsComponent } from './stats/stats.component';
import { Top100Component } from './top100/top100.component';
import { AwardsComponent } from './awards/awards.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'association', component: AssociationComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'honour', redirectTo: 'honour/A Grade', pathMatch: 'full' },
  { path: 'honour/:honourType', component: HonourComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'records/top100/:name', component: Top100Component },
  { path: 'stats/:statsType', component: StatsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }