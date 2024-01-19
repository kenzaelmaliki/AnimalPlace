import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedDataService } from '../shared-data.service';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../api/animal.service';
import { WebsocketService } from '../websocket.service';
import { IonSegment } from '@ionic/angular/standalone';
import { WsMessage } from '../../app/api/WsMessage.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  wsMessage: WsMessage | undefined;
  message: string = '';
  wsSubscription!: Subscription;
  animalLikeResponse: string | undefined;

  constructor(
    private readonly sharedDataService: SharedDataService,
    private readonly animalService: AnimalService,
    private wsService: WebsocketService,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.animalSelected = animal;
      // if there is no selected animal, display a message to select one in the profile
      if (!this.animalSelected) {
        // afficher un message qui faut sélectionner un animal dans le profil
        console.log('Sélectionnez un animal dans le profil');
      }
      // console.log('Animal sélectionné dans la page:', this.animalSelected);
    });
    // requête qui permet de récupérer les animaux des autres
    this.animalService
      .getAnimalsAll(this.animalSelected?.species || '')
      .subscribe((animals) => {
        //  console.log(animals);
        this.animals = animals;
      });
  }
  profil() {
    this.router.navigate(['/tabs/profil']);
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  filterAnimals(filter: string) {
    this.selectedFilter = filter;
    //  console.log('ça filtre');
    this.animalService.getAnimalsAll(filter || '').subscribe((animals) => {
      this.animals = animals;
      //    console.log(`Mes animaux :  ${this.animals?.toString()}`);
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
    //  console.log('animalQuONLIke', animalQuONLIke);
    //  console.log('notreAnimal', notreAnimal);

    if (notreAnimal && animalQuONLIke) {
      this.wsService.listen<WsMessage>().subscribe((message) => {
        console.log('message', message);
      });
      this.animalService.animalLike(notreAnimal, animalQuONLIke).subscribe(
        (response) => {
          // Stockez la réponse dans votre variable locale
          this.animalLikeResponse = response;
          console.log('Réponse de animalLike:', this.animalLikeResponse);
          this.presentAlert(response);
        },
        (error) => {
          // Traitez les erreurs ici
          console.error('Erreur lors de animalLike:', error);
        }
      );
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

    // Stockez la réponse dans votre variable locale
  }

  sendMessage() {
    this.message = 'test';
    this.wsService.send({ msg: this.message });
    console.log('message', this.message);
  }

  nextDisliked() {
    this.idAnimal++;
    if (this.idAnimal >= this.animals?.length!) {
      this.idAnimal = 0;
    }
  }
  /* ngOnDestroy() {
    // Assurez-vous de vous désabonner pour éviter les fuites de mémoire
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  } */
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
