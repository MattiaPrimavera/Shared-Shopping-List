import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingItem } from 'src/models/shopping-item';
import { ItemService } from './item.service';
import { AddItemBottomSheetService } from './add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from './update-item-bottom-sheet.service';
import { ItemDataService } from './item-data.service';

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
    private itemDataService: ItemDataService
  ) {
    this.items = itemService.list();
  }

  onItemClicked(item: any) {
    this.itemDataService.setUpdateItem(item);
    this.showUpdateItemBottomSheet();
  }

  showUpdateItemBottomSheet() {
    this.updateItemBottomSheet.open();
  }

  showAddItemBottomSheet() {
    this.addItemBottomSheet.open();
  }
}
