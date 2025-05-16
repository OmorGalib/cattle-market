import { Routes } from '@angular/router';
import { CattleListComponent } from './components/cattle-list/cattle-list.component';
import { CattleFormComponent } from './components/cattle-form/cattle-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.gaurd';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cattle', component: CattleListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: CattleFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } 
];