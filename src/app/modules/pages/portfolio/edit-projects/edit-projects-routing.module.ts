import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjectsComponent } from './edit-projects.component';

const routes: Routes = [{ path: '', component: EditProjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProjectsRoutingModule { }
