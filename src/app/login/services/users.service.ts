import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer b5d38fc8-966c-4a0c-81dc-63214356e174',
    }),
  };

  private jsonUrl =
    'https://firebasestorage.googleapis.com/v0/b/exp3-s8-json.appspot.com/o/users.json?alt=media&token=b5d38fc8-966c-4a0c-81dc-63214356e174';

  constructor(private http: HttpClient) {}

  getUsersData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

  updateUsersJson(users: User[]) {
    this.http.post(this.jsonUrl, users, this.httpOptions).subscribe(
      (response) => {
        console.log({ response });
      },
      (error) => {
        console.error({ error });
      }
    );
  }
}
