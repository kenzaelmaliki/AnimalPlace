import { Routes } from '@angular/router';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs/tabs.page';
import { AuthGuard } from './auth/security/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
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
        path: 'edit-profile',
        loadComponent: () =>
          import('./edit-profile/edit-profile.page').then(
            (m) => m.EditProfilePage
          ),
      },
      {
        path: 'update-animals',
        loadComponent: () =>
          import('./update-animals/update-animals.page').then(
            (m) => m.UpdateAnimalsPage
          ),
      },
      {
        path: 'create-animals',
        loadComponent: () =>
          import('./create-animals/create-animals.page').then(
            (m) => m.UpdateAnimalsPage
          ),
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
    canActivate: [AuthGuard],
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
  },  {
    path: 'match',
    loadComponent: () => import('./match/match.page').then( m => m.MatchPage)
  },
  {
    path: 'actualite-animal',
    loadComponent: () => import('./actualite-animal/actualite-animal.page').then( m => m.ActualiteAnimalPage)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
