import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  delayWhen,
  filter,
  from,
  map,
  switchMap,
} from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { AuthRequest } from './auth-request.model';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
const API_URL = 'https://archioweb-animalsplace.onrender.com';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(
    private http: HttpClient,
    private readonly storage: Storage,
    private readonly router: Router
  ) {
    this.#auth$ = new ReplaySubject(1);
    // Emit an undefined value on startup for now
    this.storage.get('auth').then((auth) => {
      this.#auth$.next(auth);
    });
  }

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.User));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.Token));
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/auth/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.#saveAuth(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.User.email} logged in`);
        return auth.User;
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logOut(): void {
    this.storage.remove('auth');
    this.#auth$.next(undefined);
    console.log('User logged out');
    this.router.navigateByUrl('/login');
  }

  #saveAuth(auth: AuthResponse) {
    return from(this.storage.set('auth', auth));
  }

  sendRequestWithToken$(
    url: string,
    method: string,
    body: any
  ): Observable<any> {
    return this.getToken$().pipe(
      filter((token) => Boolean(token)),
      switchMap((token) =>
        this.http.request<any>(method, url, {
          headers: { Authorization: `Bearer ${token}` },
          body: body,
        })
      )
    );
  }
}
