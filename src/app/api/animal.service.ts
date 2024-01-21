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

  getAnimals(): Observable<Animal[] | undefined> {
    const url = `${API_URL}/animals?owner=true`;

    // Récupérer le token depuis votre source d'authentification
    return this.auth.getToken$().pipe(
      // Handle the token value in the pipe
      switchMap((authToken) => {
        // Ajouter le token à l'en-tête d'autorisation
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${authToken}`
        );

        // Ajouter les en-têtes à la requête HTTP
        return this.http.get<Animal[]>(url, { headers });
      })
    );
  }

  getAnimalsAll(species: string): Observable<Animal[] | undefined> {
    const url = `${API_URL}/animals?species=${species}`;
    // console.log(species);
    // Récupérer le token depuis votre source d'authentification
    return this.auth.getToken$().pipe(
      // Handle the token value in the pipe
      switchMap((authToken) => {
        // Ajouter le token à l'en-tête d'autorisation
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${authToken}`
        );

        // Ajouter les en-têtes à la requête HTTP
        return this.http.get<Animal[]>(url, { headers });
      })
    );
  }
  private handleApiError(error: any): string {
    // Vous pouvez personnaliser cette fonction en fonction de la structure de vos erreurs API
    if (error instanceof ErrorEvent) {
      // Erreur côté client
      return `Erreur côté client : ${error.message}`;
    } else if (error && error.error && error.error.message) {
      // Erreur côté serveur avec un message spécifique
      return `Erreur du serveur API : ${error.error.message}`;
    } else {
      // Autre type d'erreur
      return `Erreur du serveur API : ${error.status} - ${error.statusText}`;
    }
  }

  updateAnimals(id: string, animalsData: any): Observable<any> {
    const url = `${environment.apiUrl}/animals/${id}`;
    //return this.http.patch<any>(url, userData);
    return this.auth
      .sendRequestWithToken$(url, 'PATCH', animalsData)
      .pipe(map((response: any) => response.message));
  }
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
  deleteAnimal(id: string): Observable<any> {
    const url = `${environment.apiUrl}/animals/${id}`;
    return this.auth.sendRequestWithToken$(url, 'DELETE', undefined);
  }

  animalLike(id: string, animalData: any): Observable<any> {
    const url = `${environment.apiUrl}/meetings/like/${id}`;
    // retourner le message envoyé par l'api
    // Assuming 'message' is a property in the response body
    return this.auth
      .sendRequestWithToken$(url, 'POST', animalData)
      .pipe(map((response: any) => response.message));
  }

  getMatches(): Observable<any> {
    const url = `${environment.apiUrl}/meetings/users`;
    return this.auth.sendRequestWithToken$(url, 'GET', undefined);
  }
}
