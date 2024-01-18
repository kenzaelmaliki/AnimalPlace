import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/security/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../api/user.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule],
})
export class EditProfilePage {
  newFirstName: string = '';
  newLastName: string = '';
  newEmail: string = '';
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  saveChanges() {
    // Appeler le service d'authentification pour mettre à jour le profil
    // Remplacez cela par la logique réelle pour mettre à jour le profil

    this.authService.getUser$().subscribe((user) => {
      if (user) {
        const userData = {
          firstName: this.newFirstName ? this.newFirstName : user.firstName,
          lastName: this.newLastName ? this.newLastName : user.lastName,
          email: this.newEmail ? this.newEmail : user.email,
        };

        this.userService
          .updateUser(user._id, userData)
          .subscribe((response) => {
            this.user = response;
          });
      }
    });

    this.router.navigate(['/profil']);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['login']);
    // Ajoutez ici la redirection vers la page de connexion
  }
}
