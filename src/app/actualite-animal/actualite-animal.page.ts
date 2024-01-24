import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { paw, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { Animal } from '../models/animal.model';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-actualite-animal',
  templateUrl: './actualite-animal.page.html',
  styleUrls: ['./actualite-animal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ActualiteAnimalPage implements OnInit {
  currentAnimal: Animal | undefined;
  owner: any;
  constructor(
    private navCtrl: NavController,
    private sharedDataService: SharedDataService,
    private router: Router,
    private userService: UserService
  ) {
    addIcons({ paw, 'arrow-back-outline': arrowBackOutline });
  }

  ngOnInit() {
    // permet de récupérer l'animal sélectionné dans la page meeting
    this.sharedDataService.currentAnimal$.subscribe((currentAnimal) => {
      this.currentAnimal = currentAnimal;
      if (this.currentAnimal) {
        this.owner = this.currentAnimal.owner;
        console.log('owener ' + this.owner);
      }
      // on voulait récupérer le nom de l'utilisateur mais ça ne fonctionne pas étant donné que notre API permet uniquement de récupérer son propre profil et non celui des autres
      // et on ne souhaitait pas modifier  l'API pour le moment
      /*    if (this.owner) {
        this.userService.getUser(this.owner).subscribe((user) => {
          console.log('on passe par là');
          if (user) {
            console.log(user.firstName);
            console.log('mon utilisateur' + user);
            this.owner = user.firstName;
            console.log(this.owner);
          }
        });
      } */
    });
    // console.log(this.currentAnimal);
  }
  // permet de se rendre sur la carte pour observer la localisation des utilisateurs
  voirSurLaCarte() {
    this.router.navigate(['tabs/map']);
  }
}
