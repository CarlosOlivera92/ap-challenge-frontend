import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from '@app/shared/models/projects';
import { ProjectsService } from '@app/shared/services/projects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  projectName = '';
  descripcion = '';
  repositoryUrl = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  projects:any;
  user = this.userInfo.id
  selectedItem;
  constructor(private projectsService: ProjectsService, private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }
  onCreate(): void {
    const project = new Projects();
    project.projectName = this.projectName;
    project.description = this.descripcion;
    project.repositoryUrl = this.repositoryUrl;
    project.usuario = {
      id: this.user
    };
    this.projectsService.save(project).subscribe(
      data => {
        this.toastr.success('Item Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/portfolio']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }
  getProjects() {
    this.projectsService.getProjects()
    .subscribe(items => {
      this.projects = items;
      console.log(this.projects);
    });
  }
}
