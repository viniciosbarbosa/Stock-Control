import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ProductEvent } from 'src/app/models/enum/products/ProductEvent';
import { DeleteProductAction } from 'src/app/models/interfaces/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  @Input() productsTable: Array<GetAllProductResponse> = [];
  @Output() editSelectProductEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();
  public productSelected!: GetAllProductResponse;

  public addProductEvent = ProductEvent.add_product_event;
  public editProductEvent = ProductEvent.edit_product_event;

  ngOnInit(): void {
    console.log(this.productsTable);
  }

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.editSelectProductEvent.emit(productEventData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({
        product_id,
        productName,
      });
    }
  }
}
