import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEducationRoutingModule } from './edit-education-routing.module';
import { EditEducationComponent } from './edit-education.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditEducationComponent
  ],
  imports: [
    CommonModule,
    EditEducationRoutingModule,
    FormsModule
  ]
})
export class EditEducationModule { }
