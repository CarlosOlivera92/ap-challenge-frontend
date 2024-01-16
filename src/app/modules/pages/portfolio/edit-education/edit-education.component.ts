import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutosEd } from '@app/shared/models/institutos-ed';
import { UserInstitutes } from '@app/shared/models/user-institutes';
import { EducationServiceService } from '@app/shared/services/education-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  currentInfo;
  titulo = '';
  descripcion = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  institutes:any = [{
    id:0, institute: "Selecciona un instituto"
  }];
  userInstitutes: UserInstitutes;
  user = this.userInfo.id
  selectedItem;
  constructor(private userInstituteService : EducationServiceService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getInstitutes();
    this.getInfo();
    this.userInstituteService.detail(this.id).subscribe(
      data => {
        this.userInstitutes = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  getInfo() {
    this.userInstituteService.detail(this.id)
    .subscribe(items => {
      this.currentInfo = items
    })
  }
  onSelected(id:number): void {
		this.selectedItem = id; 
    console.log(this.selectedItem);
  }
  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const userInstitute = new UserInstitutes();
    userInstitute.titulo = this.titulo;
    userInstitute.descripcion = this.descripcion;
    userInstitute.usuario = {
      id: this.user
    };
    userInstitute.institute =  {
      id: this.selectedItem
    };
    this.userInstituteService.update(id, userInstitute).subscribe(
      data => {
        this.toastr.success('Producto Actualizado', 'OK', {
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
      //console.log(this.institutes[0].institute);
    });
  }
}
