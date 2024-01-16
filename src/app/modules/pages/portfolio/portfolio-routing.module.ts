import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'editEducation/:id', loadChildren: () => import('./edit-education/edit-education.module').then(m => m.EditEducationModule) },
  { path: 'addEducation', loadChildren: () => import('./add-education/add-education.module').then(m => m.AddEducationModule) },
  { path: 'editProfessions/:id', loadChildren: () => import('./edit-profession/edit-profession.module').then(m => m.EditProfessionModule) },
  { path: 'addProfessions', loadChildren: () => import('./add-profession/add-profession.module').then(m => m.AddProfessionModule) },
  { path: 'editProjects/:id', loadChildren: () => import('./edit-projects/edit-projects.module').then(m => m.EditProjectsModule) },
  { path: 'addProjects', loadChildren: () => import('./add-projects/add-projects.module').then(m => m.AddProjectsModule) },
  { path: 'editUser/:id', loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserModule) },
  { path: 'editProfilePic/:id', loadChildren: () => import('./edit-profile-pic/edit-profile-pic.module').then(m => m.EditProfilePicModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
