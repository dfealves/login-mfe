import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, shareReplay } from 'rxjs/operators'

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthentication: boolean;

  readonly URL = environment.url;
  constructor(
    private http: HttpClient
  ) { }

  signIn(body) {
    const url = `${this.URL}/auth/login`;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Accept: 'application/json',
      })
    }
    return this.http.post(url, body).pipe(
      tap(res => {
        this.setSession(res)
      }),
      shareReplay()
    )
  }

  private setSession(response) {
    sessionStorage.setItem('authUser', JSON.stringify(response));
  }
}
