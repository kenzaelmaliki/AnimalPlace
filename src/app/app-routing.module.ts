import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    // Add the guard to the canActivate array of this route
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/sigup/sigup.page').then((m) => m.SignupPage),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
