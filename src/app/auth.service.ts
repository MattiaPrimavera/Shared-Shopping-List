import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.user.subscribe(user => {
      console.log('User found: ', user)
    })
  }
 
  get currentUser(): Observable<User> {
    return this.afAuth.user
  }

  signInAnonymously() {
    this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        this.router.navigate(['shopping'])
      })
      .catch(error => {
        console.log('Error found', error.code, 'message:', error.message)
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('Logout successful')
        this.router.navigate(['/'])
      })
  }
}
