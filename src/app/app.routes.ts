import { Routes } from '@angular/router';
import { PageMobValueComponent } from './pages/page-mob-value/page-mob-value.component';
import { PageXpGraphComponent } from './pages/page-xp-graph/page-xp-graph.component';

export const routes: Routes = [
  {path: '', redirectTo: '/mobs/value', pathMatch: 'full'},
  {path: 'mobs/value', pathMatch: 'full', component: PageMobValueComponent},
  {path: 'xp', pathMatch: 'full', component: PageXpGraphComponent},
  {path: '**', redirectTo: '/mobs/value'}
];
