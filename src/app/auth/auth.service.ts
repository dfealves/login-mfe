import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.post(url, body)
  }

  checkUserIsAuthenticated(): boolean {
    const sessionStorageUser = sessionStorage.getItem('authUser');

    if (sessionStorageUser) {
      this.userAuthentication = true;
    } else {
      this.userAuthentication = false;
    }
    return this.userAuthentication;
  }

}
