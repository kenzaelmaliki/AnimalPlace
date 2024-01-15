import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
       path: 'map',
      loadComponent: () =>
        import('../map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'meeting',
        loadComponent: () =>
          import('../meeting/meeting.page').then((m) => m.MeetingPage),
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('../profil/profil.page').then((m) => m.ProfilPage),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
 
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
   
];
