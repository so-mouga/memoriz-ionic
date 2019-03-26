import { Injectable } from '@angular/core';
import { User, UserInterface } from '@app/shared/class/user';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const domainServer = environment.domain_server;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  currentUserSubject: BehaviorSubject<User>;
  currentUserOservable: Observable<User>;

  constructor(public http: HttpClient) {
    this.user = new User();
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUserOservable = this.currentUserSubject.asObservable();
  }

  emitUser() {
    this.currentUserSubject.next(this.user);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getInfoUser(id: number): Observable<User> {
    return this.http.get(`${domainServer}/api/users/${id}`).pipe(
      map((data: UserInterface) => {
        this.user.makeUser(data);
        this.emitUser();
        return this.user;
      }),
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${domainServer}/api/users`, user);
  }
}
