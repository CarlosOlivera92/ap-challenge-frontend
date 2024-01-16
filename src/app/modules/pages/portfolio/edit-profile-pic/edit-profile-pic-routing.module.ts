import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilePicComponent } from './edit-profile-pic.component';

const routes: Routes = [{ path: '', component: EditProfilePicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfilePicRoutingModule { }
