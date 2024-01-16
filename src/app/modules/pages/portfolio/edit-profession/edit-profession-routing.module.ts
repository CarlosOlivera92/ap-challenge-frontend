import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfessionComponent } from './edit-profession.component';

const routes: Routes = [{ path: '', component: EditProfessionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfessionRoutingModule { }
