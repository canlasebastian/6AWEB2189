import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of , tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})

export class Httpclient {
  private usersUrls = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  getUsersRemotely(): Observable<User[]> {
  const cachedUsers = localStorage.getItem('users');

  if (cachedUsers) {
    return of(JSON.parse(cachedUsers));
  }

  return this.http.get<User[]>(this.usersUrls).pipe(
    tap(users => localStorage.setItem('users', JSON.stringify(users)))
  );
  }
}
