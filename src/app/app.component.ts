import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ShoppingItem } from 'src/models/shopping-item';

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
    itemService: ItemService,
    private addItemBottomSheet: AddItemBottomSheetService,
    private updateItemBottomSheet: UpdateItemBottomSheetService,
    private itemDataService: ItemDataService,
    private snackbarService: SnackbarService
  ) {
    this.items = itemService.list();
  }

  onItemClicked(item: any) {
    this.itemDataService.setUpdateItem(item);
    this.showUpdateItemBottomSheet();
  }

  showUpdateItemBottomSheet() {
    const updateBottomSheetRef = this.updateItemBottomSheet.open();
    updateBottomSheetRef.afterDismissed().subscribe(isUpdateOperation => {
      this.snackbarService.openSnackBar('Operation success', isUpdateOperation ? 'UPDATE' : 'DELETE');
    });
  }

  showAddItemBottomSheet() {
    const addItemBottomSheet = this.addItemBottomSheet.open();
    addItemBottomSheet.afterDismissed().subscribe(() => {
      this.snackbarService.openSnackBar('Operation success', 'CREATE');
    });
  }
}
