import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../api/animal.service';
import { Router } from '@angular/router';
import { AnimalRequest } from './create-animal-request.model';

@Component({
  selector: 'app-update-animals',
  templateUrl: './create-animals.page.html',
  styleUrls: ['./create-animals.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class UpdateAnimalsPage {
  messageError: '' | undefined;
  imports = [IonicModule, CommonModule, FormsModule, ReactiveFormsModule];

  animalRequest: AnimalRequest = {
    name: '',
    species: '',
    age: Number(),
    profilPictureUrl: '',
    favoriteActivites: [],
    location: '',
  };

  constructor(private animalService: AnimalService, private router: Router) {
    this.animalRequest = {
      name: '',
      species: '',
      age: Number(),
      profilPictureUrl: '',
      favoriteActivites: [],
      location: '',
    };
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    let animalData = {
      name: this.animalRequest.name,
      species: this.animalRequest.species,
      age: this.animalRequest.age,
      profilPictureUrl: this.animalRequest.profilPictureUrl,
      favoriteActivites: this.animalRequest.favoriteActivites,
      location: this.animalRequest.location,
    };

    console.log(animalData);

    this.animalService.createAnimal(animalData).subscribe(
      (animal) => {
        console.log('Animal créé', animal);
        this.router.navigate(['/tabs/profil']);
      },
      (error) => {
        this.messageError = error.error;
        // Ajoutez ici le code pour afficher ou gérer l'erreur dans l'interface utilisateur.
        // Par exemple, vous pouvez stocker le message d'erreur dans une variable pour l'afficher dans le template.
      }
    );
  }
}
