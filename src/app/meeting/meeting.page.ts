import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../api/animal.service';

import { IonSegment } from '@ionic/angular/standalone';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MeetingPage implements OnInit {
  isFlipped: boolean = false;
  animalSelected: Animal | undefined;
  species: string = '';
  animals: Animal[] | undefined;
  selectedFilter: string = '';
  idAnimal: number = 0;

  constructor(
    private readonly sharedDataService: SharedDataService,
    private readonly animalService: AnimalService
  ) {}

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.animalSelected = animal;
      console.log('Animal sélectionné dans la page:', this.animalSelected);
    });
    // requête qui permet de récupérer les animaux des autres
    this.animalService
      .getAnimalsAll(this.animalSelected?.species || '')
      .subscribe((animals) => {
        console.log(animals);
        this.animals = animals;
        console.log();
      });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  filterAnimals(filter: string) {
    this.selectedFilter = filter;
    console.log('ça filtre');
    this.animalService.getAnimalsAll(filter || '').subscribe((animals) => {
      this.animals = animals;
      console.log(`Mes animaux :  ${this.animals?.toString()}`);
    });
  }
  nextLiked() {
    this.idAnimal++;
    if (this.idAnimal >= this.animals?.length!) {
      this.idAnimal = 0;
    }
    const animalQuONLIke = {
      animalUserID: this.animals![this.idAnimal]._id,
    };

    const notreAnimal = this.animalSelected?._id;
    console.log('animalQuONLIke', animalQuONLIke);
    console.log('notreAnimal', notreAnimal);

    if (notreAnimal && animalQuONLIke) {
      this.animalService.animalLike(notreAnimal, animalQuONLIke).subscribe();
    }
  }
  nextDisliked() {
    this.idAnimal++;
    if (this.idAnimal >= this.animals?.length!) {
      this.idAnimal = 0;
    }
  }
}
