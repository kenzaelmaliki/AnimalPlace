// profil.page.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { User } from '../models/user.model';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth/security/auth.service';
import { AnimalService } from '../api/animal.service';
import { Animal } from '../models/animal.model';
import { cogOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ProfilPage implements OnInit {
  user: User | undefined;
  animals: Animal[] | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly animalService: AnimalService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authService.getUser$().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    this.animalService.getAnimals().subscribe((animals) => {
      console.log(animals);
      this.animals = animals;
      console.log('je passe');
    });
    /* this.userService.getUser(userId).subscribe((userData) => {
      this.user = userData;
    });*/
    // Obtenez l'ID de l'utilisateur à partir de votre service d'authentification ou d'une autre source
    const userId = this.user?._id; /* Obtenez l'ID de l'utilisateur */
  }

  onIconClick() {
    // Utilisez le service Router pour naviguer vers la nouvelle page
    this.router.navigate(['edit-profile']); // Remplacez '/nouvelle-page' par le chemin de votre nouvelle page
  }

  logout() {
    this.authService.logOut();
    // Ajoutez ici la redirection vers la page de connexion
  }
}
