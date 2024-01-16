import { Component, OnInit } from '@angular/core';
import { TokenService } from '@app/shared/services/token.service';
import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { EducationServiceService } from '@app/shared/services/education-service.service';
import { InstitutosEd } from '@app/shared/models/institutos-ed';
import { NewUser } from '@app/shared/models/new-user';
import { UserInstitutes } from '@app/shared/models/user-institutes';
import { ProfessionService } from '@app/shared/services/profession.service';
import { Professions } from '@app/shared/models/professions';
import { ProjectsService } from '@app/shared/services/projects.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  number:number= 50;
  user : any[] = [];
  currentUser: any;
  userInstitutes: any;
  projects:any;
  currentUserInstitutes: UserInstitutes;
  professions: any;
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  currentUserProfessions:any = [];
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private userInstituteService:EducationServiceService,
    private professionsService: ProfessionService,
    private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getUserInstitutes();
    this.getProfessions();
    this.getProjects();
    console.log(this.userInfo.about)
  }

  saleData = [
    { name: "Mobiles", value: 50 },
  ];

  getUsers(): void {
    this.userService.getUsersList().subscribe(
      data => {
        this.user = data;
        for (let i of this.user) {
          if (i.id == this.userInfo.id) {
            this.currentUser = i;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  getUserInstitutes(): void {
    this.userInstituteService.lista()
    .subscribe(items => {
      // You can use the arrow function expression:
      var result = items.filter(obj => {
        // Returns the object where
        // the given property has some value 
          return obj.usuario.id === this.currentUser.id
      })
      this.userInstitutes = result;
    });
  }

  getProfessions(): void {
    this.professionsService.lista()
    .subscribe(
      items => {
        // You can use the arrow function expression:
        var result = items.filter(obj => {
          // Returns the object where
          // the given property has some value 
            return obj.usuario.id === this.currentUser.id
        })
        this.professions = result;
      }
    )
  } 
  getProjects() {
    this.projectsService.getProjects()
    .subscribe(items => {
      // You can use the arrow function expression:
      var result = items.filter(obj => {
        console.log("algo")
        console.log(this.currentUser.id)
        // Returns the object where
        // the given property has some value 
          return obj.usuario.id === this.currentUser.id
      })
      this.projects = result;
      console.log(this.projects);
    });
  }
  onDeleteProject(id:number) {
    this.projectsService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
  onDeleteProfession(id:number) {
    this.professionsService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
  onDeleteEduItem(id: number) {
    this.userInstituteService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}