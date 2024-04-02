import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = environment.apiUrl;
  private JWT_TOKEN = this.cookieService.get('User_Token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllCatogories(): Observable<Array<GetCategoriesResponse>> {
    return this.http.get<Array<GetCategoriesResponse>>(
      `${this.apiUrl}/categories`,
      this.httpOptions
    );
  }

  createNewCategory(requestDatas: {
    name: string;
  }): Observable<Array<GetCategoriesResponse>> {
    return this.http.post<Array<GetCategoriesResponse>>(
      `${this.apiUrl}/category`,
      requestDatas,
      this.httpOptions
    );
  }

  editCategoryName(requestData: {
    name: string;
    category_id: string;
  }): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/category/edit`,
      { name: requestData.name },
      {
        ...this.httpOptions,
        params: {
          category_id: requestData.category_id,
        },
      }
    );
  }

  deleteCategory(requestDatas: { category_id: string }): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/category/delete`, {
      ...this.httpOptions,
      params: {
        category_id: requestDatas.category_id,
      },
    });
  }
}
