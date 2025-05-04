import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { ListComponent } from './list/list.component';
import { TotdComponent } from './totd/totd.component';
import { PlayerStatsComponent } from './stats/player/player-stats.component';
import { CoachStatsComponent } from './stats/coach/coach-stats.component';
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
    { path: 'records/list/:name', component: ListComponent },
    { path: 'stats/player', redirectTo: 'stats/player/0', pathMatch: 'full' },
    { path: 'stats/player/:id', component: PlayerStatsComponent },
    { path: 'stats/coach', redirectTo: 'stats/coach/0', pathMatch: 'full' },
    { path: 'stats/coach/:id', component: CoachStatsComponent },
    { path: 'totd', redirectTo: 'totd/2010-2019-Senior', pathMatch: 'full' },
    { path: 'totd/:totdName', component: TotdComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];