import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './ui/pages/shopping/shopping.component';
import { InviteUserComponent } from './ui/modals/invite-user/invite-user.component';
import { ChatComponent } from './ui/modals/chat/chat.component';

const routes: Routes = [
  { path: '', component: ShoppingComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'invite', component: InviteUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }