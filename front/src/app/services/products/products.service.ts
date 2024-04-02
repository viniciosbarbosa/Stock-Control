import { CreateProductResponse } from './../../models/interfaces/products/response/CreateProductResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';
import { SaleProductRequest } from 'src/app/models/interfaces/products/request/SaleProductRequest';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { GetAllProductResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';
import { SaleProductResponse } from 'src/app/models/interfaces/products/response/SaleProductResponse';
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

  createProduct(
    params: CreateProductRequest
  ): Observable<Array<CreateProductResponse>> {
    return this.http.post<Array<CreateProductResponse>>(
      `${this.apiUrl}/product/`,
      params,
      this.httpOptions
    );
  }

  editProduct(requestDatas: EditProductRequest): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/product/edit`,
      requestDatas,
      this.httpOptions
    );
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.apiUrl}/product/delete`,
      {
        ...this.httpOptions,
        params: {
          product_id: product_id,
        },
      }
    );
  }

  saleProduct(
    requestDatas: SaleProductRequest
  ): Observable<SaleProductResponse> {
    return this.http.put<SaleProductResponse>(
      `${this.apiUrl}/product/sale`,
      { amount: requestDatas?.amount },
      { ...this.httpOptions, params: { product_id: requestDatas.product_id } }
    );
  }
}
