import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

addUser(userData: any){
      const url = `${environment.apiUrl}/users`;
      return this.http.post<any>(url, userData);
  }
}
