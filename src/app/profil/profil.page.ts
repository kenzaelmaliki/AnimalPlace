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
import { settingsOutline, createOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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
  listeAnimaux: Animal[] | undefined;
  matches: any[] | undefined;
  currentAnimal: Animal | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly animalService: AnimalService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly sharedDataService: SharedDataService,
    private readonly storage: Storage
  ) {
    addIcons({ settingsOutline, createOutline });
  }

  ngOnInit() {
    this.sharedDataService.listeAnimaux$.subscribe((listeAnimaux) => {
      this.listeAnimaux = listeAnimaux;
    });
    this.sharedDataService.currentAnimal$.subscribe((currentAnimal) => {
      this.currentAnimal = currentAnimal;
    });
  }
  ionViewWillEnter() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.animalService.getAnimals().subscribe((animals) => {
      console.log(animals);
      this.animals = animals;
      // console.log('je passe');
    });
    this.authService.getUser$().subscribe((user) => {
      this.userID = user?._id;
      //   console.log('get user ! ', user?._id);

      if (this.userID) {
        this.userService.getUser(this.userID).subscribe((user) => {
          this.user = user;
          console.log('user dans le sub ', this.user);
          // console.log('user dans le sub ', this.user);
        });
      }
    });

    this.sharedDataService.animalSelected$.subscribe((animal) => {
      //  console.log('Animal sélectionné dans ProfilPage:', animal);
      this.animalSelected = animal;
    });

    this.animalService.getMatches().subscribe((matches) => {
      this.matches = matches;
      console.log('matches picked up', matches);
      if (this.matches) {
        this.matches.forEach((match) => {
          match.date = new Date(match.date);
        });
      }
    });
  }

  onIconClick() {
    this.router.navigate(['tabs/edit-profile']);
  }

  logout() {
    this.userService.stopUpdatingPosition();
    this.authService.logOut();
  }

  onAnimalSelect(animal: Animal, animals: Animal[]) {
    this.sharedDataService.animalSelected = animal;
    this.sharedDataService.listeAnimaux = animals;

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
    this.router.navigate(['tabs/create-animals']);
  }

  updateAnimal(animal: Animal) {
    this.sharedDataService.animalSelected = animal;
    this.router.navigate(['tabs/update-animals']);
  }

  afficheProfil(animal: Animal) {
    this.sharedDataService.currentAnimal = animal;
    console.log('current animal', this.sharedDataService.currentAnimal);
    this.router.navigate(['/actualite-animal']);
  }
}
