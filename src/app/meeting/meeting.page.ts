import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../api/animal.service';
import { WebsocketService } from '../websocket.service';
import { WsMessage } from '../../app/api/WsMessage.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ErrorHandler } from '@angular/core';
import { paw, person, map } from 'ionicons/icons';
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
  currentAnimal: Animal | undefined;
  selectedFilter: string = '';
  idAnimal: number = 0;
  wsMessage: WsMessage | undefined;
  message: string = '';
  wsSubscription!: Subscription;
  animalLikeResponse: string | undefined;
  messagePasAnimaux = false;

  constructor(
    private readonly sharedDataService: SharedDataService,
    private readonly animalService: AnimalService,
    private wsService: WebsocketService,
    private alertController: AlertController,
    private router: Router,
    private readonly errorHandler: ErrorHandler,
    private readonly toast: ToastController
  ) {
    addIcons({ settingsOutline, paw, person, map });
  }

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.animalSelected = animal;
      if (!this.animalSelected) {
        console.log("pas d'animal sélectionné");
      }
      // console.log('Animal sélectionné dans la page:', this.animalSelected);
    });
    // requête qui permet de récupérer les animaux des autres
    this.animalService
      .getAnimalsAll(this.animalSelected?.species || '')
      .subscribe((animals) => {
        //  console.log(animals);
        this.animals = animals;
        this.currentAnimal = this.animals?.shift();
      });
  }
  profil() {
    this.router.navigate(['/tabs/profil']);
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  filterAnimals(filter: string) {
    this.messagePasAnimaux = false;
    this.selectedFilter = filter;
    this.animalService.getAnimalsAll(filter || '').subscribe((animals) => {
      this.animals = animals;
      this.currentAnimal = this.animals?.shift();
    });
  }
  nextLiked() {
    if (this.currentAnimal) {
      const animalQuONLIke = {
        animalUserID: this.currentAnimal._id,
      };

      const notreAnimal = this.animalSelected?._id;

      /*   if (notreAnimal && animalQuONLIke) {
        this.wsService.listen<WsMessage>().subscribe((message) => {
          console.log('message', message);
          this.toast.create({
            message: message.type,
            duration: 3000,
            position: 'bottom',
          });
        }); */

      if (this.animalSelected && this.currentAnimal) {
        this.animalService
          .animalLike(this.animalSelected._id, animalQuONLIke)
          .subscribe({
            next: (response) => {
              // Stockez la réponse dans votre variable locale
              console.log(response);
              this.animalLikeResponse = response;
              console.log('Réponse de animalLike:', this.animalLikeResponse);
              if (this.animalLikeResponse === 'Un nouveau match !') {
                if (this.currentAnimal && this.animalSelected) {
                  console.log('match ça passe');
                  //  console.log('avant navigation on envoi', this.currentAnimal);
                  this.sharedDataService.currentAnimal = this.currentAnimal;
                  this.router.navigate(['/match']);
                }
                // this.presentAlert(response);
              }

              console.log(response);
              this.toast
                .create({
                  message: response,
                  duration: 3000,
                  position: 'bottom',
                })
                .then((toast) => {
                  toast.present();
                });
            },
          });
      }
      const data = {
        type: 'Vous avez un nouveau like',
      };

      console.log('data', data);
      this.wsService.send(JSON.stringify(data));
      this.wsService.listen<WsMessage>().subscribe((message) => {
        console.log('message', message);
        this.message = message.type;
        this.wsService.send(JSON.stringify(data));
        this.message = message.type;
        console.log('message', this.message);
        this.sendMessage();
      });

      this.selectNextAnimal();
    }
  }

  sendMessage() {
    this.message = 'test';
    this.wsService.send({ msg: this.message });
    console.log('message', this.message);
  }

  selectNextAnimal() {
    if (this.animals && this.animals.length > 0) {
      this.currentAnimal = this.animals?.shift();
    } else {
      this.currentAnimal = undefined;
    }
    console.log(this.animals, this.currentAnimal);
  }

  presentAlert(response: string) {
    if (response === 'Vous avez un match !') {
      this.alertController
        .create({
          header: 'Félicitations !',
          message: response,
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
    this.alertController
      .create({
        header: 'Un nouveau message pour vous !',
        message: response,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
}
