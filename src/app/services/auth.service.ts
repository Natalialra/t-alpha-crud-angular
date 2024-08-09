import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/auth';
  constructor(private http: HttpClient) { }

  register(user: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
