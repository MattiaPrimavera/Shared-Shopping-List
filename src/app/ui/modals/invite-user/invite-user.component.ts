import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreService } from 'src/app/services/store/store.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent {
  constructor(public authService: AuthService, private store: StoreService) { }

  copyInviteToClipboard() {
    const uid = this.store.getState().uid;
    this.copyToClipboard(`${environment.inviteBaseUrl}/${uid}`);
  }

  copyToClipboard(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}