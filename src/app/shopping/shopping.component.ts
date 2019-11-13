import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, stagger, animateChild } from '@angular/animations';
import { ShoppingItem } from '../models/shopping-item';
import { Observable } from 'rxjs';
import { ItemService } from '../services/item/item.service';
import { AddItemBottomSheetService } from '../ui/add-item/bottom-sheet/add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from '../ui/update-item/bottom-sheet/update-item-bottom-sheet.service';
import { ItemDataService } from '../services/item-data/item-data.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { AuthService } from '../auth.service';

@Component({
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(300, animateChild()), { optional: true })
      ]),
    ])
  ],
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  title = 'shared-shopping-list';
  items: Observable<ShoppingItem[]>;

  constructor(
    private authService: AuthService,
    private itemService: ItemService,
    private addItemBottomSheet: AddItemBottomSheetService,
    private updateItemBottomSheet: UpdateItemBottomSheetService,
    private itemDataService: ItemDataService,
    private snackbarService: SnackbarService,
  ) {
    this.items = itemService.list();
  }

  onItemClicked(item: ShoppingItem) {
    this.itemDataService.setUpdateItem(item);
    this.showUpdateItemBottomSheet();
  }

  onItemDone(item: ShoppingItem) {
    this.itemService.update(item.key, { ...item, done: true });
  }

  onItemUndo(item: ShoppingItem) {
    this.itemService.update(item.key, { ...item, done: false });
  }

  showUpdateItemBottomSheet() {
    const updateBottomSheetRef = this.updateItemBottomSheet.open();
    updateBottomSheetRef.afterDismissed().subscribe(data => {
      if (data && !data.error) {
        this.snackbarService.openSnackBar('Operation success', data.isUpdate ? 'UPDATE' : 'DELETE');
      }
    });
  }

  showAddItemBottomSheet() {
    const addItemBottomSheet = this.addItemBottomSheet.open();
    addItemBottomSheet.afterDismissed().subscribe(data => {
      if (data && !data.error) {
        this.snackbarService.openSnackBar('Operation success', 'CREATE');
      }
    });
  }

  trackShoppingItem(item) {
    console.log(item);
    return item ? item.key : undefined;
  }
}
