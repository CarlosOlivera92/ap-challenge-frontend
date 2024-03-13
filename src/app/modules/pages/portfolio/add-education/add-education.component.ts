import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Institutes } from '@app/shared/models/institutes';
import { InstitutosEd } from '@app/shared/models/institutos-ed';
import { UserInstitutes } from '@app/shared/models/user-institutes';
import { EducationServiceService } from '@app/shared/services/education-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {
  titulo = '';
  descripcion = '';
  institute = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  institutes:any = [{
    id:0, institute: "Selecciona un instituto"
  }];
  user = this.userInfo.id
  selectedItem;
  constructor(private userInstituteService: EducationServiceService, private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getInstitutes();
    console.log(this.user)
  }
  onSelected(id:number): void {
		this.selectedItem = id; 
    console.log(this.selectedItem);
  }
  onCreateInstitute() {
    const institutes = new Institutes();
    institutes.institute = this.institute;
    this.userInstituteService.addInstitute(institutes).subscribe(
      data => {
        this.toastr.success('Item Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    )
  }
  onCreate(): void {
    const userInstitute = new UserInstitutes();
    userInstitute.titulo = this.titulo;
    userInstitute.descripcion = this.descripcion;
    userInstitute.usuario = {
      id: this.user
    };
    userInstitute.institute =  {
      id: this.selectedItem
    };
    this.userInstituteService.save(userInstitute).subscribe(
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
  
  getInstitutes() {
    this.userInstituteService.getInstitute()
    .subscribe(items => {
      this.institutes = items;
    });
  }
}
