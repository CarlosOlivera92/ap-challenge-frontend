import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEducationRoutingModule } from './add-education-routing.module';
import { AddEducationComponent } from './add-education.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddEducationComponent
  ],
  imports: [
    CommonModule,
    AddEducationRoutingModule,
    FormsModule
  ]
})
export class AddEducationModule { }
