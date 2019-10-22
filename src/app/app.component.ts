import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingItem } from 'src/models/shopping-item';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shared-shopping-list';
  items: Observable<ShoppingItem[]>;

  constructor(itemService: ItemService, private addItemBottomSheet: BottomSheetComponent) {
    this.items = itemService.list();
  }

  showAddItemBottomSheet() {
    this.addItemBottomSheet.open();
  }
}
