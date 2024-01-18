import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../api/animal.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-animals',
  templateUrl: './update-animals.page.html',
  styleUrls: ['./update-animals.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class UpdateAnimalsPage implements OnInit {
  animalSelected: Animal | undefined;
  newName: string = '';
  newAge: number = Number();
  newProfilPictureUrl: string = '';
  newFavoriteActivites: string[] = [];
  newLocation: string = '';
  animals: Animal[] | undefined;

  constructor(
    private readonly sharedDataService: SharedDataService,
    private animalService: AnimalService,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.animalSelected = animal;

      if (this.animalSelected) {
        this.newName = this.animalSelected.name || '';
        this.newAge = this.animalSelected.age || 0;
        this.newProfilPictureUrl = this.animalSelected.profilePictureURL || '';
        this.newFavoriteActivites =
          this.animalSelected.favoriteActivities || [];
        this.newLocation = this.animalSelected.location || '';
      }

      console.log('Animal sélectionné dans la page:', this.animalSelected);
    });
  }

  saveChanges() {
    // Do not do anything if the form is invalid.

    const updateProfilPicture =
      this.newProfilPictureUrl !== null &&
      this.newProfilPictureUrl !== undefined
        ? this.newProfilPictureUrl
        : this.animalSelected?.profilePictureURL;

    const updateFavoriteActivites =
      this.newFavoriteActivites !== null &&
      this.newFavoriteActivites !== undefined
        ? this.newFavoriteActivites
        : this.animalSelected?.favoriteActivities;

    const updateLocation =
      this.newLocation !== null && this.newLocation !== undefined
        ? this.newLocation
        : this.animalSelected?.location;

    let animalData = {
      name: this.newName,
      // age: updatedAge,
      profilePictureURL: updateProfilPicture,
      favoriteActivities: updateFavoriteActivites,
      location: updateLocation,
    };

    this.sharedDataService.animalSelected$.subscribe((animal) => {
      if (animal) {
        this.animalService
          .updateAnimals(animal._id, animalData)
          .subscribe((response) => {
            this.animalSelected = response;
          });
      }
    });

    this.router.navigate(['/tabs/profil']);
  }

  /////// DELETE ANIMAL ///////
  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cet animal?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Mettez ici votre logique de suppression
            this.deleteAnimal();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAnimal() {
    // supprime l'animal qui est sélectionné
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      if (animal) {
        this.animalService.deleteAnimal(animal._id).subscribe(
          (response) => {
            console.log('Animal supprimé', response);
            this.sharedDataService.notifyAnimalDeleted();
            this.router.navigate(['/profil']);
          },
          (error) => {
            console.error("Erreur lors de la suppression de l'animal", error);
          }
        );
      }
    });
    this.router.navigate(['/tabs/profil']);
  }
}
