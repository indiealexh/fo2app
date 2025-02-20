import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '/mobs/value', pathMatch: 'full'},
  {
    path: 'mobs/value',
    pathMatch: 'full',
    loadComponent: () => import('./pages/page-mob-value/page-mob-value.component').then(m => m.PageMobValueComponent)
  },
  {
    path: 'xp',
    pathMatch: 'full',
    loadComponent: () => import('./pages/page-xp-graph/page-xp-graph.component').then(m => m.PageXpGraphComponent)
  },
  {path: '**', redirectTo: '/mobs/value'}
];
