import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { paw, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-actualite-animal',
  templateUrl: './actualite-animal.page.html',
  styleUrls: ['./actualite-animal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ActualiteAnimalPage implements OnInit {
  constructor(private navCtrl: NavController) {
    addIcons({ paw, 'arrow-back-outline': arrowBackOutline });
  }

  ngOnInit() {}
  voirSurLaCarte() {
    // Logique pour naviguer vers la carte ou effectuer toute autre action
    console.log('Voir sur la carte');
  }
  goBack() {
    this.navCtrl.back(); // Utilisez cette ligne pour revenir à la page précédente
  }
}
