import { Injectable } from '@angular/core';
import { BehaviorSubject, take, map } from 'rxjs';
import { GetAllProductResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  public productsDataEmitter$ =
    new BehaviorSubject<Array<GetAllProductResponse> | null>(null);

  public productsDatas: Array<GetAllProductResponse> = [];

  setProductsListDatas(productsLists: Array<GetAllProductResponse>): void {
    if (productsLists) {
      this.productsDataEmitter$.next(productsLists);
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        },
      });

    return this.productsDatas;
  }
}
