import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/pages/login/login.component';
import { ShoppingComponent } from './ui/pages/shopping/shopping.component'
import { InviteUserComponent } from './ui/modals/invite-user/invite-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'invite', component: InviteUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
