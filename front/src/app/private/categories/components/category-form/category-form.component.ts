import { Subject, takeUntil } from 'rxjs';
import { CategoryEvent } from './../../../../models/enum/category/CategoryEvent';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public categoryForm!: FormGroup;

  public categoryAction!: { event: EditCategoryAction };

  public addCategoryAction = CategoryEvent.add_category_action;
  public editCategoryAction = CategoryEvent.edit_category_action;

  constructor(
    public ref: DynamicDialogConfig,
    private messageService: MessageService,
    private dialog: DynamicDialogRef,
    private categoriesServices: CategoriesService
  ) {}

  ngOnInit(): void {
    this.carregarCategoryForm();

    this.categoryAction = this.ref.data;

    if (
      (this.categoryAction?.event?.action === this.editCategoryAction &&
        this.categoryAction?.event?.categoryName !== null) ||
      undefined
    ) {
      this.setCategoryName(this.categoryAction?.event?.categoryName as string);
    }
  }

  carregarCategoryForm(): void {
    this.categoryForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
    });
  }

  handleSubmitCategoryAction(): void {
    if (this.categoryAction.event.action === this.addCategoryAction) {
      this.handleSubmitAddCategory();
    } else if (this.categoryAction.event.action === this.editCategoryAction) {
      this.handleSubmitEditCategory();
    }

    return;
  }

  handleSubmitEditCategory(): void {
    if (
      this.categoryForm.value &&
      this.categoryForm.valid &&
      this.categoryAction?.event?.id
    ) {
      const requestEditCategory: { name: string; category_id: string } = {
        name: this.categoryForm.value.name as string,
        category_id: this.categoryAction?.event?.id,
      };

      this.categoriesServices
        .editCategoryName(requestEditCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.categoryForm.reset();
            this.dialog.close();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria editado com sucesso!',
              life: 2500,
            });
          },
          error: (err) => {
            this.categoryForm.reset();
            this.dialog.close();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error ao editar categoria!',
              life: 2500,
            });
          },
        });
    }
  }

  setCategoryName(categoryName: string) {
    if (categoryName) {
      this.categoryForm.setValue({
        name: categoryName,
      });
    }
  }

  handleSubmitAddCategory(): void {
    if (this.categoryForm?.value && this.categoryForm?.valid) {
      const requestCreateCategory: { name: string } = {
        name: this.categoryForm.value.name as string,
      };

      this.categoriesServices
        .createNewCategory(requestCreateCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.categoryForm.reset();
              this.dialog.close();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Categoria criada com sucesso!',
                life: 3000,
              });
            }
          },
          error: (err) => {
            this.categoryForm.reset();
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao criar categoria!',
              life: 3000,
            });
          },
        });
    }
  }
  ngOnDestroy(): void {}
}
