import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/security/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../api/user.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorHandler } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
    private userService: UserService,
    private readonly errorHandler: ErrorHandler,
    private readonly alertController: AlertController
  ) {
    this.authService.getUser$().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  saveChanges() {
    this.authService.getUser$().subscribe((user) => {
      if (user) {
        const userData = {
          firstName: this.newFirstName ? this.newFirstName : user.firstName,
          lastName: this.newLastName ? this.newLastName : user.lastName,
          email: this.newEmail ? this.newEmail : user.email,
        };

        this.userService.updateUser(user._id, userData).subscribe(
          (response) => {
            this.user = response;
            this.errorHandler.handleError('Votre profil a bien été mis à jour');
          },
          (error) => {
            this.errorHandler.handleError(
              'Problème lors de la mise à jour de votre profil'
            );
          }
        );
      }
    });

    this.router.navigate(['/tabs/profil']);
  }

  // lorsqu'un utilisateur se déconnecte, on arrête de mettre à jour sa position, on le déconnecte et on le redirige vers la page de connexion
  logout() {
    this.userService.stopUpdatingPosition();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer votre compte ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }
  // permet de supprimer un compte utilisateur
  deleteAccount() {
    console.log(this.user?._id);
    const userId = this.user?._id ?? '';
    console.log(userId);
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        this.errorHandler.handleError('Votre compte a bien été supprimé');
        this.logout();
      },
      (error) => {
        this.errorHandler.handleError(
          'Problème lors de la suppression de votre compte'
        );
      }
    );
  }
}
