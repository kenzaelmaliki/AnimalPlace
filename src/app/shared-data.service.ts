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

  notifyAnimalDeleted() {
    this._notifyAnimalDeleted.next();
  }

  get notifyAnimalDeleted$() {
    return this._notifyAnimalDeleted.asObservable();
  }

  get animalSelected$() {
    return this._animalSelected.asObservable();
  }

  set animalSelected(value: Animal | undefined) {
    this._animalSelected.next(value);
  }
}
