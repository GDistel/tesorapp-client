import { NgModule } from '@angular/core';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { UserAccountComponent } from './user-account.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserAccountComponent
  ],
  imports: [
    SharedModule,
    UserAccountRoutingModule
  ]
})
export class UserAccountModule { }
