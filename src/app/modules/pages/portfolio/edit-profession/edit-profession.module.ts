import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfessionRoutingModule } from './edit-profession-routing.module';
import { EditProfessionComponent } from './edit-profession.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditProfessionComponent
  ],
  imports: [
    CommonModule,
    EditProfessionRoutingModule,
    FormsModule
  ]
})
export class EditProfessionModule { }
