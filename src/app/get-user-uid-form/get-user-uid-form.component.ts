import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'get-user-uid-form',
  templateUrl: './get-user-uid-form.component.html',
  styleUrls: ['./get-user-uid-form.component.scss']
})
export class GetUserUidFormComponent {
  title: string
  userUid: string;
  userUidForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GetUserUidFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.title = data.title
    this.userUidForm = new FormGroup({
      uid: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit() {
    const { uid } = this.userUidForm.value;
    console.log('Userid found: ', uid)
    this.dialogRef.close(uid);
  }
}
