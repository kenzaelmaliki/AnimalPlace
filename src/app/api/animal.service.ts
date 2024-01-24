import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../models/animal.model';
import { AuthService } from '../auth/security/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

const API_URL = 'https://archioweb-animalsplace.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // permet de récupérer les animaux de l'utilisateur actuel
  getAnimals(): Observable<Animal[] | undefined> {
    const url = `${API_URL}/animals?owner=true`;
    return this.auth.getToken$().pipe(
      switchMap((authToken) => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${authToken}`
        );
        return this.http.get<Animal[]>(url, { headers });
      })
    );
  }

  // permet de récupérer tous les animaux de la BD en spécifiant l'espèce que nous souhaitons voir
  getAnimalsAll(species: string): Observable<Animal[] | undefined> {
    const url = `${API_URL}/animals?species=${species}`;
    return this.auth.getToken$().pipe(
      switchMap((authToken) => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${authToken}`
        );
        return this.http.get<Animal[]>(url, { headers });
      })
    );
  }

  // permet de modifier un animal à l'aide de son ID
  updateAnimals(id: string, animalsData: any): Observable<any> {
    const url = `${environment.apiUrl}/animals/${id}`;
    return this.auth
      .sendRequestWithToken$(url, 'PATCH', animalsData)
      .pipe(map((response: any) => response.message));
  }

  // permet de créer un nouvel animal dans la BD
  createAnimal(animalData: any): Observable<any> {
    const url = `${environment.apiUrl}/animals`;
    console.log(animalData);
    return this.auth.sendRequestWithToken$(url, 'POST', animalData).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

  // permet de supprimer un animal de la BD
  deleteAnimal(id: string): Observable<any> {
    const url = `${environment.apiUrl}/animals/${id}`;
    return this.auth.sendRequestWithToken$(url, 'DELETE', undefined);
  }

  // permet d'aimer un anial, pour cela nous avons besoin de l'ID de l'animal qui like et de l'ID de l'animal qui recoit le like
  animalLike(id: string, animalData: any): Observable<any> {
    const url = `${environment.apiUrl}/meetings/like/${id}`;
    return this.auth
      .sendRequestWithToken$(url, 'POST', animalData)
      .pipe(map((response: any) => response.message));
  }

  // permet de récupérer la liste des matches acutels
  getMatches(): Observable<any> {
    const url = `${environment.apiUrl}/meetings/users`;
    return this.auth.sendRequestWithToken$(url, 'GET', undefined);
  }
}
