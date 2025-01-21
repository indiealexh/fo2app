import { Routes } from '@angular/router';
import { PageMobValueComponent } from './pages/page-mob-value/page-mob-value.component';

export const routes: Routes = [
  {path: '', redirectTo: '/mobs/value', pathMatch: 'full'},
  {path: 'mobs/value', pathMatch: 'full', component: PageMobValueComponent},
  {path: '**', redirectTo: '/mobs/value'}
];
