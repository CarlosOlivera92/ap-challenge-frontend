import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProfessionRoutingModule } from './add-profession-routing.module';
import { AddProfessionComponent } from './add-profession.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProfessionComponent
  ],
  imports: [
    CommonModule,
    AddProfessionRoutingModule,
    FormsModule
  ]
})
export class AddProfessionModule { }
