import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../models/animal.model';
import { AuthService } from '../auth/security/auth.service';
import { switchMap } from 'rxjs/operators';

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
}
