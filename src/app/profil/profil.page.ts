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
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../shared-data.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProfilPage {
  userID: string | undefined;
  user: User | undefined;
  animals: Animal[] | undefined;
  animalSelected: Animal | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly animalService: AnimalService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly sharedDataService: SharedDataService,
    private readonly storage: Storage
  ) {}

  ionViewWillEnter() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.animalService.getAnimals().subscribe((animals) => {
      console.log(animals);
      this.animals = animals;
      console.log('je passe');
    });
    this.authService.getUser$().subscribe((user) => {
      this.userID = user?._id;
      console.log('get user ! ', user?._id);

      if (this.userID) {
        this.userService.getUser(this.userID).subscribe((user) => {
          this.user = user;
          console.log('user dans le sub ', this.user);
        });
      }
    });

    this.sharedDataService.animalSelected$.subscribe((animal) => {
      console.log('Animal sélectionné dans ProfilPage:', animal);
      this.animalSelected = animal;
    });
  }

  onIconClick() {
    this.router.navigate(['edit-profile']);
  }

  logout() {
    this.authService.logOut();
  }

  onAnimalSelect(animal: Animal) {
    this.sharedDataService.animalSelected = animal;
    console.log('animal selected ', this.sharedDataService.animalSelected);
  }

  toggleSelection(animal: Animal) {
    if (this.animalSelected === animal) {
      // Désélectionner l'animal actuel
      this.sharedDataService.animalSelected = undefined;
    } else {
      // Sélectionner un nouvel animal
      this.sharedDataService.animalSelected = animal;
    }
  }

  createAnimal() {
    this.router.navigate(['create-animals']);
  }

  updateAnimal(animal: Animal) {
    this.sharedDataService.animalSelected = animal;
    this.router.navigate(['update-animals']);
  }
}
