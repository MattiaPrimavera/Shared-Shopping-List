import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    protected authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  signInAnonymously() {
    this.authService.signInAnonymously()
    this.authService.user.subscribe(user => {
      if (user) {
        console.log('Navigating with uid: ', user.uid)
        this.router.navigate(['shopping', { uid: user.uid }])
      }
    })
  }
}
