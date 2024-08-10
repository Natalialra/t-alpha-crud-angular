import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/auth';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }

  register(user: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: Partial<User>): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
