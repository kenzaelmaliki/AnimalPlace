import { Routes } from '@angular/router';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'layout',
        loadComponent: () =>
          import('./layout/layout.page').then((m) => m.LayoutPage),
      },
      {
        path: 'map',
        loadComponent: () => import('./map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'meeting',
        loadComponent: () =>
          import('./meeting/meeting.page').then((m) => m.MeetingPage),
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./profil/profil.page').then((m) => m.ProfilPage),
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'sigup',
        loadComponent: () =>
          import('./auth/sigup/sigup.page').then((m) => m.SignupPage),
      },
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./edit-profile/edit-profile.page').then(
            (m) => m.EditProfilePage
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
