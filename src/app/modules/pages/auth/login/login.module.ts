import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class LoginModule { }
