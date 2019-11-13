import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import { DbService } from './services/database/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: StoreService,
    private db: DbService
  ) {
    this.afAuth.user.subscribe(user => {
      console.log('User found: ', user)
      if (user) {
        this.store.setState({
          isAuth: true,
          uid: user.uid
        })
      } else this.store.setState(null)
    })
  }
 
  get user(): Observable<User> {
    return this.afAuth.user
  }

  async signInAnonymously() {
    try {
      await this.afAuth.auth.signInAnonymously()
      this.router.navigate(['shopping'])
    } catch (error) {
      console.log(`Error code ${error.code} message: ${error.message}`)
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut()
    console.log('Logout successful')
    this.router.navigate(['/'])
  }
}
