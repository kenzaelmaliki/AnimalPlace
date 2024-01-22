// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../app/models/animal.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private _animalSelected = new BehaviorSubject<Animal | undefined>(undefined);
  private _notifyAnimalDeleted = new BehaviorSubject<void>(undefined);
  private _listeAnimaux = new BehaviorSubject<Animal[] | undefined>(undefined);
  private _listeMatches = new BehaviorSubject<any[] | undefined>(undefined);

  constructor(private readonly storage: Storage) {
    this.storage.get('animalSelected').then((animal) => {
      this._animalSelected.next(JSON.parse(animal));
    });
  }

  notifyAnimalDeleted() {
    this._notifyAnimalDeleted.next();
  }

  get notifyAnimalDeleted$() {
    return this._notifyAnimalDeleted.asObservable();
  }

  get animalSelected$() {
    return this._animalSelected.asObservable();
  }

  get listeAnimaux$() {
    console.log('selection get');
    return this._animalSelected.asObservable();
  }

  set listeAnimaux(value: any[] | undefined) {
    console.log('selection set');
    this._listeAnimaux.next(value);
  }

  set animalSelected(value: Animal | undefined) {
    this.storage.set('animalSelected', JSON.stringify(value));
    this._animalSelected.next(value);
  }
}
