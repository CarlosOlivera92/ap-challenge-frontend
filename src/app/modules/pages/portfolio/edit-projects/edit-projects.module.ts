import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjectsRoutingModule } from './edit-projects-routing.module';
import { EditProjectsComponent } from './edit-projects.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditProjectsComponent
  ],
  imports: [
    CommonModule,
    EditProjectsRoutingModule,
    FormsModule
  ]
})
export class EditProjectsModule { }
