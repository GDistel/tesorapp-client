import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthRequest, Credentials } from './interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient
  ) { }

  getTokens(authRequest: AuthRequest): Promise<Credentials> {
    const { username, password } = authRequest;
    const requestBody = { username, password };
    return this.http.post<Credentials>(`${environment.apiUrl}/auth/signin`, requestBody).toPromise();
  }

  // refreshToken(refreshToken: string): Observable<Credentials> {
  //   return this.http.post<Credentials>(
  //     `${environment.apiUrl}/auth/refresh`, { refresh: refreshToken }
  //   );
  // }
}
