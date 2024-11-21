import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { Top100Component } from './top100/top100.component';
import { TotdComponent } from './totd/totd.component';
import { StatsComponent } from './stats/stats.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { HonourComponent } from './honour/honour.component';
import { AwardsComponent } from './awards/awards.component';
import { AssociationComponent } from './association/association.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'association', component: AssociationComponent },
    { path: 'awards', redirectTo: 'awards/2024', pathMatch: 'full' },
    { path: 'awards/:awardsYear', component: AwardsComponent },
    { path: 'honour', redirectTo: 'honour/A Grade', pathMatch: 'full' },
    { path: 'honour/:honourType', component: HonourComponent },
    { path: 'milestones', component: MilestonesComponent },
    { path: 'records', component: RecordsComponent },
    { path: 'records/top100/:name', component: Top100Component },
    { path: 'stats/:statsType', component: StatsComponent },
    { path: 'stats/:statsType/:id', component: StatsComponent },
    { path: 'totd', redirectTo: 'totd/2010-2019-Senior', pathMatch: 'full' },
    { path: 'totd/:totdName', component: TotdComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];