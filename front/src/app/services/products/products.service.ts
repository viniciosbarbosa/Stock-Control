import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllProductResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private JWT_TOKEN = this.cookieService.get('User_Token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllProduct(): Observable<Array<GetAllProductResponse>> {
    return this.http
      .get<Array<GetAllProductResponse>>(
        `${this.apiUrl}/products`,
        this.httpOptions
      )
      .pipe(map((product) => product.filter((data) => data?.amount > 0)));
  }
}