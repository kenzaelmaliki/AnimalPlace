import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  constructor() {}

  getLocalisation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  watchLocalisation(success: any, error: any) {
    return navigator.geolocation.watchPosition(
      (position) => {
        console.log('watch resolvin ', position);
        success(position);
      },
      (err) => {
        error(err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }

  stopWatchingLocalisation() {
    navigator.geolocation.clearWatch(0);
  }
}
