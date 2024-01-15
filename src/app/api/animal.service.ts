import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor(private http: HttpClient) {}

  getAnimals(id: string): Observable<any> {
    const url = `${environment.apiUrl}/animals/`;
    return this.http.get<any>(url);
  }
}
