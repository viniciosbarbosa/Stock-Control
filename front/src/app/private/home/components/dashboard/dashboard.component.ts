import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private productList: Array<GetAllProductResponse> = [];

  constructor(
    private productsService: ProductsService,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    this.getDatasProduct();
  }

  getDatasProduct(): void {
    this.productsService
      .getAllProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productList = response;
            console.log(this.productList);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageservice.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error ao buscar dados graficos',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
