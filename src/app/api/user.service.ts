import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/security/auth.service';
import { LocalisationService } from '../localisation.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localisationService: LocalisationService
  ) {}

  // permet d'ajouter un utilisateur à la BD
  addUser(userData: any) {
    const url = `${environment.apiUrl}/users`;
    return this.http.post<any>(url, userData);
  }
  // permet de récupérer un utilisateur spécifique à la BD en spécifiant son ID
  getUser(id: string): Observable<any> {
    const url = `${environment.apiUrl}/users/${id}`;
    return this.authService.sendRequestWithToken$(url, 'GET', undefined);
  }

  // permet de mettre à jour un utilisateur à l'aide de son ID
  updateUser(id: string, userData: any): Observable<any> {
    const url = `${environment.apiUrl}/users/${id}`;
    console.log(userData);
    console.log(id);
    //return this.http.patch<any>(url, userData);
    return this.authService.sendRequestWithToken$(url, 'PATCH', userData);
  }

  // permet de localiser un utilisateur
  startUpdatingPosition(id: string) {
    console.log('start updating position');
    this.localisationService.watchLocalisation(
      (position: any) => {
        console.log('getting user,', id, ' after position update');
        this.getUser(id).subscribe((user) => {
          user.location = {
            type: 'Point',
            coordinates: [position.coords.latitude, position.coords.longitude],
          };
          console.log('got user trying to update with ', user);
          this.updateUser(id, user).subscribe((res) => {
            console.log('updated user');
            console.log(res);
          });
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  stopUpdatingPosition() {
    console.log('stop updating position');
    this.localisationService.stopWatchingLocalisation();
  }
  // permet de récupérer tous les utilisateurs de la BD
  getAllUsers(): Observable<any> {
    const url = `${environment.apiUrl}/users`;
    return this.authService.sendRequestWithToken$(url, 'GET', undefined);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${environment.apiUrl}/users/${id}`;
    return this.authService.sendRequestWithToken$(url, 'DELETE', undefined);
  }
}
