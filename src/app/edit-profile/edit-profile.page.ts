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
    const userData = {
      firstName: this.newFirstName,
      lastName: this.newLastName,
      email: this.newEmail,
    };

    this.authService.getUser$().subscribe((user) => {
      if (user) {
        console.log("User qu'on choppe dans le sub : ", user);
        this.userService
          .updateUser(user._id, userData)
          .subscribe((response) => {
            console.log('User dans le sub du upadte ', response);
            this.user = response;
          });
      }
    });

    this.router.navigate(['/profil']);
    console.log('user après ', this.user);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    // Ajoutez ici la redirection vers la page de connexion
  }
}
