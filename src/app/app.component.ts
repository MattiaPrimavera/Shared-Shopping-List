import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingItem } from 'src/models/shopping-item';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shared-shopping-list';
  items: Observable<ShoppingItem[]>;

  constructor(db: AngularFireDatabase, private addItemBottomSheet: BottomSheetComponent) {
    this.items = db.list<ShoppingItem>('items').valueChanges();
  }

  showAddItemBottomSheet() {
    this.addItemBottomSheet.open();
  }
}
