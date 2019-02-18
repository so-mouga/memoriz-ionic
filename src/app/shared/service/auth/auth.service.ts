import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signInUser(email: string, password: string) {
    console.log(email);
    console.log(password);
  }
}
