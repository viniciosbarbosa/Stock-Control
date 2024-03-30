import { RegisterUserResponse } from './../../models/interfaces/user/RegisterUserResponse';
import { AuthResponse } from './../../models/interfaces/user/auth/AuthResponse';
import { AuthRequest } from './../../models/interfaces/user/auth/AuthRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RegisterUserRequest } from 'src/app/models/interfaces/user/RegisterUserRequest';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  registerUser(params: RegisterUserRequest): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(`${this.apiUrl}/user`, params);
  }

  authUserLogin(params: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, params);
  }

  isLogged(): boolean {
    const tokenJwt = this.cookieService.get('User_Token');
    return tokenJwt ? true : false;
  }
}
