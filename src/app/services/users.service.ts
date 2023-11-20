import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '@interfaces/req.response';
import { delay, map, Observable } from 'rxjs';

interface State {
  loading: boolean;
  users: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);

  // #state === private. But with "#" when the transpilation is complete it will be private too in EcmaScript.
  #state = signal<State>({
    loading: true,
    users: [],
  });

  users = computed(() => this.#state().users);
  loading = computed(() => this.#state().loading);

  constructor() {
    console.log('Loading data...');

    this.getUsers()
      .pipe(delay(1500))
      .subscribe(({ data }: UsersResponse) => {
        this.#state.set({
          loading: false,
          users: data,
        });
      });
  }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`https://reqres.in/api/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(1500),
        map(({ data }) => data)
      );
  }
}
