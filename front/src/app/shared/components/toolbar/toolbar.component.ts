import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductEvent } from 'src/app/models/enum/products/ProductEvent';
import { ProductFormComponent } from 'src/app/private/products/components/product-form/product-form.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  logoutApplication() {
    this.cookieService.deleteAll();
    void this.router.navigate(['/login']);
  }

  handleSaleProduct(): void {
    const saleProductAction = ProductEvent.sale_product_event;
    this.dialogService.open(ProductFormComponent, {
      header: ProductEvent.sale_product_event,
      width: '70%',
      height: '45%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: saleProductAction },
      },
    });
  }
}
