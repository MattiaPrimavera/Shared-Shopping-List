import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, stagger, animateChild } from '@angular/animations';
import { ShoppingItem } from '../models/shopping-item';
import { Observable } from 'rxjs';
import { ItemsService } from '../services/database/items.service';
import { AddItemBottomSheetService } from '../ui/add-item/bottom-sheet/add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from '../ui/update-item/bottom-sheet/update-item-bottom-sheet.service';
import { ItemDataService } from '../services/item-data/item-data.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from '../services/database/friends/friends.service';
import { MatDialog } from '@angular/material/dialog';
import { GetUserUidFormComponent } from '../get-user-uid-form/get-user-uid-form.component';
import { StoreService } from '../store.service';

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
export class ShoppingComponent implements OnInit {
  title = 'shared-shopping-list';
  items: Observable<ShoppingItem[]>;

  uid: string
  action: string
  hideJoin = false

  constructor(
    private authService: AuthService,
    private itemsService: ItemsService,
    private addItemBottomSheet: AddItemBottomSheetService,
    private updateItemBottomSheet: UpdateItemBottomSheetService,
    private itemDataService: ItemDataService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private friendsService: FriendsService,
    public dialog: MatDialog,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    console.log('Shopping component constructor')
    this.items = this.route.paramMap.pipe(
      switchMap(params => {
        this.uid = params.get('uid');
        this.itemsService.setupDatabase(this.uid)

        const loggedInUserUid = this.store.getState().uid
        this.friendsService.setupDatabase(loggedInUserUid)
        return this.itemsService.list()
      })
    );
  }

  createShoppingList() {
    const dialogRef = this.openDialog('Create shopping', GetUserUidFormComponent)
    dialogRef.afterClosed().subscribe(inviteUserUid => {
      console.log(`[shopping] Inviting friend ${inviteUserUid}`)
      if (inviteUserUid) {
        this.friendsService.save({ uid: inviteUserUid })
      }
    });
  }

  joinShoppingList() {
    const dialogRef = this.openDialog('Join shopping', GetUserUidFormComponent)
    dialogRef.afterClosed().subscribe(uid => {
      if (uid) {
        this.itemsService.setupDatabase(uid)
        this.items = this.itemsService.list()
        console.log(`[shopping] Joining list ${uid}`);
      }
    });
  }

  openDialog(title: string, modalClass: any): any {
    const dialogRef = this.dialog.open(modalClass, {
      width: '250px',
      data: { title }
    });
    return dialogRef
  }

  onItemClicked(item: ShoppingItem) {
    this.itemDataService.setUpdateItem(item);
    this.showUpdateItemBottomSheet();
  }

  onItemDone(item: ShoppingItem) {
    this.itemsService.update({ ...item, done: true });
  }

  onItemUndo(item: ShoppingItem) {
    this.itemsService.update({ ...item, done: false });
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

  inviteUser() {}
}
