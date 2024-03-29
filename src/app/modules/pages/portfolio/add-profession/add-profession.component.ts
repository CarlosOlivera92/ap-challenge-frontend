import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '@app/shared/models/company';
import { Professions } from '@app/shared/models/professions';
import { ProfessionService } from '@app/shared/services/profession.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.scss']
})
export class AddProfessionComponent implements OnInit {

  position = '';
  descripcion = '';
  company = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  companies:any = [{
    id:0, company: "Selecciona una empresa"
  }];
  user = this.userInfo.id
  selectedItem;
  since:Date;
  until:Date;


  constructor(private professionService:ProfessionService , private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getCompanies();

  }
  onSelected(event: any): void {
    console.log(event.target.value)
    this.selectedItem = event.target.value;
    console.log('Valor seleccionado:', this.selectedItem);
  }
  onCreateCompany() {
    const company = new Company();
    company.company = this.company;
    this.professionService.addCompany(company).subscribe(
      data => {
        this.toastr.success('Item Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    )
  }
  onCreate(): void {
    const professions = new Professions();
    professions.position = this.position;
    professions.description = this.descripcion;
    professions.since = this.since;
    professions.until = this.until;
    professions.usuario = {
      id: this.user
    };
    professions.company =  {
      id: this.selectedItem
    };
    this.professionService.save(professions).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }
  
  getCompanies() {
    this.professionService.getCompanies()
    .subscribe(items => {
      this.companies = items;
    });
  }
}
