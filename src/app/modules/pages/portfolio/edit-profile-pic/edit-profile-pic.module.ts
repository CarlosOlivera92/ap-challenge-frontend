import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfilePicRoutingModule } from './edit-profile-pic-routing.module';
import { EditProfilePicComponent } from './edit-profile-pic.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditProfilePicComponent
  ],
  imports: [
    CommonModule,
    EditProfilePicRoutingModule,
    FormsModule
  ]
})
export class EditProfilePicModule { }
