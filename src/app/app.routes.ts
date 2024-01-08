import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'layout',
    loadComponent: () => import('./layout/layout.page').then( m => m.LayoutPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.page').then( m => m.MapPage)
  },
  {
    path: 'meeting',
    loadComponent: () => import('./meeting/meeting.page').then( m => m.MeetingPage)
  },
  {
    path: 'profil',
    loadComponent: () => import('./profil/profil.page').then( m => m.ProfilPage)
  },

];
