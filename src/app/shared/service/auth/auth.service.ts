import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInterface } from '@app/shared/class/user';
import { UserService } from '@app/shared/service/user/user.service';

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
  authenticationState = new BehaviorSubject(null);

  constructor(private http: HttpClient, private JwtHelper: JwtHelperService, private userService: UserService) {
    this.checkToken();
  }

  get currentAuthenticationValue(): UserInterface {
    return this.authenticationState.value;
  }

  checkToken(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (!this.JwtHelper.isTokenExpired(token)) {
        const decoded = this.JwtHelper.decodeToken(token);
        this.authenticationState.next(decoded.data);
      } else {
        this.clearToken();
      }
    }
  }

  logInUser(email: string, password: string): Observable<UserAuthInterface> {
    return this.http
      .post<UserAuthInterface>(`${domainServer}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap(res => {
          localStorage.setItem(TOKEN_KEY, res.token);
          const decoded = this.JwtHelper.decodeToken(res.token);
          this.authenticationState.next(decoded.data);
        }),
        catchError(e => {
          throw new Error(e);
        }),
      );
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
  }
}
