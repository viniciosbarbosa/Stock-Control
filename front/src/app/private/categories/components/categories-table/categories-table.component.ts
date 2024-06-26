import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'src/app/models/enum/category/CategoryEvent';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/event/DeleteCategoryAction';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategoriesResponse> = [];
  @Output() public categoryEvent = new EventEmitter<EditCategoryAction>();
  @Output() public deleteCategoryEvent =
    new EventEmitter<DeleteCategoryAction>();

  public addCategoryAction = CategoryEvent.add_category_action;
  public editCategoryAction = CategoryEvent.edit_category_action;

  public categorySelected!: GetCategoriesResponse;

  handleCategoryEvent(
    action: string,
    id?: string,
    categoryName?: string
  ): void {
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName });
    }
  }

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (categoryName && category_id !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName });
    }
  }
}
