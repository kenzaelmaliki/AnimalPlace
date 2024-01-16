import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addUser(userData: any) {
    const url = `${environment.apiUrl}/users`;
    return this.http.post<any>(url, userData);
  }

  getUser(id: string): Observable<any> {
    const url = `${environment.apiUrl}/users/${id}`;
    return this.authService.sendRequestWithToken$(url, 'GET', undefined);
  }

  updateUser(id: string, userData: any): Observable<any> {
    const url = `${environment.apiUrl}/users/${id}`;
    console.log(userData);
    console.log(id);
    //return this.http.patch<any>(url, userData);
    return this.authService.sendRequestWithToken$(url, 'PATCH', userData);
  }
}
