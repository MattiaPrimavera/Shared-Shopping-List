import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ShoppingItem } from 'src/app/models/shopping-item';

import { AddItemBottomSheetService } from './ui/add-item/bottom-sheet/add-item-bottom-sheet.service';
import { ItemService } from './services/item/item.service';
import { ItemDataService } from './services/item-data/item-data.service';
import { SnackbarService } from './services/snackbar/snackbar.service';
import { UpdateItemBottomSheetService } from './ui/update-item/bottom-sheet/update-item-bottom-sheet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shared-shopping-list';
  items: Observable<ShoppingItem[]>;

  constructor(
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
}
