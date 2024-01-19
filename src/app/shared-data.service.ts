// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../app/models/animal.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private _animalSelected = new BehaviorSubject<Animal | undefined>(undefined);
  private _notifyAnimalDeleted = new BehaviorSubject<void>(undefined);
  private _listeAnimaux = new BehaviorSubject<Animal[] | undefined>(undefined);

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

  set listeAnimaux(value: Animal[] | undefined) {
    console.log('selection set');
    this._listeAnimaux.next(value);
  }

  set animalSelected(value: Animal | undefined) {
    this._animalSelected.next(value);
  }
}
