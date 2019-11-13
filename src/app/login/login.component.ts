import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JoinShoppingListComponent } from '../join-shopping-list/join-shopping-list.component';
import { DbService } from '../services/database/db.service';
import { GetUserUidFormComponent } from '../get-user-uid-form/get-user-uid-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private db: DbService
  ) { }

  createShoppingList() {
    const dialogRef = this.openDialog('Create shopping', GetUserUidFormComponent)
    dialogRef.afterClosed().subscribe(uid => {
      if (uid) {
        console.log('Got UID: ', uid);
        this.db.setupDatabase(uid)
        this.router.navigate(['shopping'])
      }
    });
  }

  joinShoppingList() {
    const dialogRef = this.openDialog('Join shopping', GetUserUidFormComponent)
    dialogRef.afterClosed().subscribe(uid => {
      if (uid) {
        console.log('Got UID: ', uid);
        this.db.setupDatabase(uid)
        this.router.navigate(['shopping'])
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
}
