import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const domainServer = environment.domain_server;
export const TOKEN_KEY = 'access_token';

interface UserAuthInterface {
  message: string
  success: boolean
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(public http: HttpClient,
              private storage: Storage,
              private JwtHelper: JwtHelperService,
  ) {
    this.checkToken();
  }

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }

  checkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = this.JwtHelper.decodeToken(token);
      const isExpired = this.JwtHelper.isTokenExpired(token);
      console.log(this.JwtHelper.getTokenExpirationDate(token));
      if (!isExpired) {
        // this.user = decoded.data; todo send user in userSubject userManager
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
        this.clearToken()
      }
    }
  }

  signInUser(email: string, password: string): Observable<UserAuthInterface> {
    return this.http.post<UserAuthInterface>(`${domainServer}/api/auth/login`, {email, password})
      .pipe(tap(res => {
        console.log('auth', res);
        localStorage.setItem(TOKEN_KEY, res.token);
        const decoded = this.JwtHelper.decodeToken(res.token);
        this.authenticationState.next(true);
        // todo decoded.data send user in userSubject userManager
      }));
  }

  logout() {
    this.clearToken()
    this.authenticationState.next(false);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
