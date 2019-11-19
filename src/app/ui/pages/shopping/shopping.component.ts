import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, stagger, animateChild } from '@angular/animations';
import { ShoppingItem } from '../../../models/shopping-item';
import { Observable, combineLatest, of } from 'rxjs';
import { ItemsService } from '../../../services/database/items/items.service';
import { AddItemBottomSheetService } from '../../components/add-item/bottom-sheet/add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from '../../components/update-item/bottom-sheet/update-item-bottom-sheet.service';
import { ItemDataService } from '../../../services/item-data/item-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { AuthService } from '../../../services/auth/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendsService } from '../../../services/database/friends/friends.service';
import { StoreService } from '../../../services/store/store.service';
import { InviteUserComponent } from '../../modals/invite-user/invite-user.component';
import { MenuAction } from './menu-toolbar/actions/menu';
import { ToolbarAction } from './menu-toolbar/actions/toolbar';
import { JoinComponent } from '../../components/join/join.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ConfirmationDialogComponent } from '../../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(300, animateChild()), { optional: true })
      ]),
    ])
  ],
  providers: [
    DialogService
  ],
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  title = 'shared-shopping-list';
  items: Observable<ShoppingItem[]>;
  step = 0;
  uid: string;

  constructor(
    private authService: AuthService,
    private itemsService: ItemsService,
    private addItemBottomSheet: AddItemBottomSheetService,
    private updateItemBottomSheet: UpdateItemBottomSheetService,
    private itemDataService: ItemDataService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private friendsService: FriendsService,
    private dialogService: DialogService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.items = this.signInAnonymously().pipe(
      switchMap(loggedInUser => {
        return combineLatest([
          of(loggedInUser ? loggedInUser.uid : null),
          this.handleDeeplinks()
        ]).pipe(switchMap(([userUid, deeplinkUid]) => {
          console.log(`UserUid ${userUid}, deeplink ${deeplinkUid}`)
          if (!userUid && !deeplinkUid) return of(null)
          return this.setupDatabase(userUid, deeplinkUid)
        }))
      })
    )

    this.authService.user.subscribe(user => {
      if (!this.items) {
        this.items = this.setupDatabase(user.uid, null);
      }
    })
  }

  signInAnonymously() {
    this.authService.signInAnonymously();
    return this.authService.user;
  }

  handleDeeplinks(): Observable<string> {
    return this.route
      .paramMap
      .pipe(map(params => params.get('uid') || null))
  }

  setupDatabase(userUid: string, deeplinkUid: string) {
    console.log(`[shopping] setup database with: deeplink uid ${deeplinkUid}, logged in uid ${userUid}`)
    const state = this.store.getState()
    if (deeplinkUid && deeplinkUid !== userUid) {
      state.joinUserUid = deeplinkUid;
      this.store.setState(state);
    }

    this.uid = deeplinkUid || userUid;
    this.itemsService.setupDatabase(this.uid);
    return this.itemsService.list();
  }

  async joinShoppingList() {
    try {
      const friendUid = await this.getFriendUid();
      console.log(`[shopping] joining ${friendUid}`);
      if (friendUid) {
        const state = this.store.getState();
        state.joinUserUid = friendUid;
        const loggedInUserUid = state.uid;
        await this.addFriend(loggedInUserUid, friendUid);
        this.swichDatabase(friendUid)
        console.log(`[shopping] Opening shopping list ${friendUid}`);
      }
    } catch (err) {
      console.error('[shopping] join', err);
      this.snackbarService.openSnackBar('Operation failed', 'JOIN');
    }
  }

  async getFriendUid() {
    const friendUid = await this.dialogService.openDialog(JoinComponent, { title: 'Join shopping '});
    return friendUid;
  }

  async addFriend(loggedInUserUid: string, friendUid: string) {
    this.friendsService.setupDatabase(loggedInUserUid);
    return this.friendsService.save({ uid: friendUid });
  }

  swichDatabase(uid: string) {
    this.itemsService.setupDatabase(uid);
    this.items = this.itemsService.list();
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
    return item ? item.key : undefined;
  }

  async openChat() {
    this.router.navigate(['chat'])
  }

  openMyShoppingList() {
    const { uid } = this.store.getState();
    this.swichDatabase(uid);
    this.snackbarService.openSnackBar('Back to my shopping list', 'OPEN');
  }

  async deleteAll() {
    const isConfirmed = await this.dialogService.openDialog(ConfirmationDialogComponent, { title: 'Confirm'})
    console.log(`[shopping] delete all isConfirmed: ${isConfirmed}`)
    if (isConfirmed) {
      await this.itemsService.deleteAll();
      this.snackbarService.openSnackBar('Shopping list cleared', 'DELETE');
    }
  }

  async inviteUser() {
    return this.dialogService.openDialog(InviteUserComponent, { title: 'Invite user '})
  }

  toolbarAction($toolbarAction) {
    console.log('[shopping] Toolbar action: ', $toolbarAction);
    switch ($toolbarAction) {
      case ToolbarAction.deleteAll:
        this.deleteAll();
        break;
      case ToolbarAction.openChat:
        this.openChat();
        break
      case ToolbarAction.openMyShoppingList:
        this.openMyShoppingList();
        break;
      default:
        break;
    }
  }

  menuAction($menuAction) {
    console.log('[shopping] Menu action: ', $menuAction);
    switch ($menuAction) {
      case MenuAction.inviteUser:
        this.inviteUser();
        break;
      case MenuAction.joinShoppingList:
        this.joinShoppingList();
        break;
      default:
        break;
    }
  }
}
