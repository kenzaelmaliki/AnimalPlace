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
  private _currentAnimal = new BehaviorSubject<Animal | undefined>(undefined);

  constructor(private readonly storage: Storage) {
    this.storage.get('animalSelected').then((animal) => {
      this._animalSelected.next(JSON.parse(animal));
      this._animalSelected.next(JSON.parse(animal));
    });
  }

  notifyAnimalDeleted() {
    this._notifyAnimalDeleted.next();
  }

  updateAnimalList(newAnimalList: Animal[] | undefined) {
    this._listeAnimaux.next(newAnimalList);
  }

  set currentAnimal(value: Animal | undefined) {
    console.log('currentAnimal set by ', value);
    this.storage.set('currentAnimal', JSON.stringify(value));
    this._currentAnimal.next(value);
  }

  get currentAnimal$() {
    console.log('currentAnimal get');

    return this._currentAnimal.asObservable();
  }

  get notifyAnimalDeleted$() {
    return this._notifyAnimalDeleted.asObservable();
  }

  get animalSelected$() {
    return this._animalSelected.asObservable();
  }

  get listeAnimaux$() {
    return this._listeAnimaux.asObservable();
  }

  set listeAnimaux(value: any[] | undefined) {
    this._listeAnimaux.next(value);
  }

  set animalSelected(value: Animal | undefined) {
    this.storage.set('animalSelected', JSON.stringify(value));
    this._animalSelected.next(value);
  }
}
