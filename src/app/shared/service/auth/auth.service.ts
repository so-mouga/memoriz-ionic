import { Injectable } from '@angular/core';
import { User } from '@app/shared/class/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signInUser(email: string, password: string) {
    console.log(email);
    console.log(password);
  }

  createUser(user: User) {
    console.log(user);
  }
}
