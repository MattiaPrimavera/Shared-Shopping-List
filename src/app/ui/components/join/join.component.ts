import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QrCodeReader } from 'src/app/services/qr-code-reader.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  subscription: Subscription;
  userUidForm: FormGroup;
  title = 'Join Shopping';

  constructor(private qrReader: QrCodeReader, public dialogRef: MatDialogRef<JoinComponent>) {
    this.userUidForm = new FormGroup({
      uid: new FormControl(''),
    });
  }

  ngOnInit() {}

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedQrCode => {
        const uid = decodedQrCode;
        console.log(`[join] QRCode scanned ${uid}`)
        this.dialogRef.close(uid)
      });
  }

  async onSubmit() {
    const { uid } = this.userUidForm.value;
    console.log('Userid found: ', uid);
    this.dialogRef.close(uid);
  }
}
