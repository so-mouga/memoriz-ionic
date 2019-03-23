import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const domainServer = environment.domain_server;
export const TOKEN_KEY = 'access_token';

interface UserAuthInterface {
  message: string;
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(public http: HttpClient, private storage: Storage, private JwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }

  async hasToken(): Promise<boolean> {
    const token = await this.storage.get(TOKEN_KEY);
    if (token) {
      const decoded = this.JwtHelper.decodeToken(token);
      if (!this.JwtHelper.isTokenExpired(token)) {
        // this.user = decoded.data; todo send user in userSubject userManager
        this.authenticationState.next(true);
      } else {
        this.clearToken();
      }
    }
    return this.authenticationState.value;
  }

  logInUser(email: string, password: string): Observable<UserAuthInterface> {
    return this.http
      .post<UserAuthInterface>(`${domainServer}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res.token);
          const decoded = this.JwtHelper.decodeToken(res.token);
          this.authenticationState.next(true);
          // todo decoded.data send user in userSubject userManager
        }),
      );
  }

  clearToken() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
}
