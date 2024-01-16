import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProjectsRoutingModule } from './add-projects-routing.module';
import { AddProjectsComponent } from './add-projects.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProjectsComponent
  ],
  imports: [
    CommonModule,
    AddProjectsRoutingModule,
    FormsModule
  ]
})
export class AddProjectsModule { }
