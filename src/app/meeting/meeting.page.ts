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

  constructor(
    private readonly sharedDataService: SharedDataService,
    private readonly animalService: AnimalService,
    private wsService: WebsocketService,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.sharedDataService.animalSelected$.subscribe((animal) => {
      this.animalSelected = animal;
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
      this.animalService.animalLike(notreAnimal, animalQuONLIke).subscribe();
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
  presentAlert() {
    this.alertController
      .create({
        header: 'Félicitations !',
        message: this.message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
}
