import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthRequest } from './interfaces';
import { Observable } from 'rxjs';
import { Tokens } from '../core/http/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  signIn(authRequest: AuthRequest): Promise<Tokens> {
    const { username, password } = authRequest;
    const requestBody = { username, password };
    return this.http.post<Tokens>(`${environment.apiUrl}/auth/signin`, requestBody).toPromise();
  }

  refreshToken(refreshToken: string): Observable<Tokens> {
    return this.http.get<Tokens>(
      `${environment.apiUrl}/auth/refresh?token=${refreshToken}`
    );
  }
}
