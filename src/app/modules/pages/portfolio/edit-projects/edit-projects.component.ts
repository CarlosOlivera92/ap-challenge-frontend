import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projects } from '@app/shared/models/projects';
import { UserInstitutes } from '@app/shared/models/user-institutes';
import { ProjectsService } from '@app/shared/services/projects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss']
})
export class EditProjectsComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  currentInfo;
  projectName = '';
  descripcion = '';
  repositoryUrl = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  user = this.userInfo.id
  constructor(private projectsService : ProjectsService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getInfo();
  }
  getInfo() {
    this.projectsService.detail(this.id)
    .subscribe(items => {
      this.currentInfo = items
      console.log(this.currentInfo)
    })
  }
  onUpdate(): void {
    const projects = new Projects();
    projects.projectName = this.projectName;
    projects.description = this.descripcion;
    projects.repositoryUrl = this.repositoryUrl;
    projects.usuario = {
      id: this.user
    };
    this.projectsService.update(this.id, projects).subscribe(
      data => {
        this.toastr.success('Item Actualizado', 'OK', {
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
}
