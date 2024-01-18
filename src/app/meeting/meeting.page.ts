import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { Animal } from '../models/animal.model';

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

  constructor(private readonly sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.animalSelected = animal;
      console.log('Animal sélectionné dans la page:', this.animalSelected);
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
