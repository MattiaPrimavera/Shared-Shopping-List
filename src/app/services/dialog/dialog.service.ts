import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) { }

  async openDialog(modalClass: any, data: any) {
    const dialogRef = this.dialog.open(modalClass, {
      width: '250px',
      data
    });

    const received = await dialogRef.afterClosed().toPromise();
    return received;
  }
}