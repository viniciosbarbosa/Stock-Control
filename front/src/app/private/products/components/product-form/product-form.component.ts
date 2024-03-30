import { GetAllProductResponse } from './../../../../models/interfaces/products/response/GetAllProductResponse';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEvent } from 'src/app/models/enum/products/ProductEvent';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public categoriesDatas: Array<GetCategoriesResponse> = [];
  public selectedCategory: Array<{ name: string; code: string }> = [];
  public productAction!: {
    event: EventAction;
    productDatas: Array<GetAllProductResponse>;
  };

  public productSelectedDatas!: Array<GetAllProductResponse>;

  public addForm!: FormGroup;
  public editForm!: FormGroup;
  public saleForm!: FormGroup;

  public renderDropDown = false;

  public addProductAction = ProductEvent.add_product_event;
  public editProductAction = ProductEvent.edit_product_event;
  public saleProductAction = ProductEvent.sale_product_event;

  constructor(
    private ref: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    private categoriesServices: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;
    this.getAllCategories();

    this.carregarForm();
  }

  carregarForm() {
    if (this.productAction.event.action === this.addProductAction) {
      this.carregarAdicionarProductForm();
    } else if (this.productAction.event.action === this.editProductAction) {
      this.carregarEditProductForm();
    } else {
      this.carregarSaleProductForm();
    }
  }

  carregarAdicionarProductForm(): void {
    this.addForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }

  carregarEditProductForm(): void {
    this.editForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }

  carregarSaleProductForm(): void {
    this.saleForm = new FormGroup<any>({
      amount: new FormControl(null, Validators.required),
      product_id: new FormControl('', Validators.required),
    });
  }

  getAllCategories(): void {
    this.categoriesServices
      .getAllCatogories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
            console.log(this.categoriesDatas);

            if (
              this.productAction?.event.action === this.editProductAction &&
              this.productAction?.productDatas
            ) {
              this.getProductSelectedDatas(
                this.productAction?.event?.id as string
              );
            }
          }
        },
      });
  }

  getProductSelectedDatas(product_id: string): void {
    const allProducts = this.productAction?.productDatas;

    if (allProducts.length > 0) {
      const productFiltered = allProducts.filter(
        (element) => element?.id === product_id
      );
      console.log(productFiltered);
    }
  }

  handleSubmitAddProduct(): void {
    if (this.addForm?.valid && this.addForm?.value) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addForm.value.name as string,
        price: this.addForm.value.price as string,
        description: this.addForm.value.description as string,
        category_id: this.addForm.value.category_id as string,
        amount: Number(this.addForm.value.amount),
      };

      this.productsService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.dialog.close();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto criado com sucesso',
            });
          },
          error: (err) => {
            this.dialog.close();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Error ao criar produto',
            });
          },
        });

      this.addForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
