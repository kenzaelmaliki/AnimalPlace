import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MatchPage implements OnInit {
  currentAnimal: Animal | undefined;
  selectedAnimal: Animal | undefined;
  constructor(private readonly sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.selectedAnimal = animal;
      console.log('animal selected', this.selectedAnimal);
    });
    this.sharedDataService.currentAnimal$.subscribe((animal) => {
      this.currentAnimal = animal;
      console.log('current animal', this.currentAnimal);
    });
  }
}
