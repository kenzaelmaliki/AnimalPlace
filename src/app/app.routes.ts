import { Routes } from '@angular/router';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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

   { 
    path: 'login',
    loadChildren: () =>
      import("./auth/login/login.page").then((m) => m.LoginPage),
  },
  {
    path: 'sigup',
    loadComponent: () => import('./auth/sigup/sigup.page').then( m => m.SignupPage)
  },
   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

