import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professions } from '@app/shared/models/professions';
import { EducationServiceService } from '@app/shared/services/education-service.service';
import { ProfessionService } from '@app/shared/services/profession.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profession',
  templateUrl: './edit-profession.component.html',
  styleUrls: ['./edit-profession.component.scss']
})
export class EditProfessionComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  currentInfo;
  position = '';
  descripcion = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  companies:any;
  user = this.userInfo.id
  selectedItem;
  since:Date;
  until:Date;
  constructor(private professionService:ProfessionService , private toastr:ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getInfo();
  }
 
  onSelected(id:number): void {
		this.selectedItem = id; 
    console.log(this.selectedItem);
  }
  onUpdate(): void {
    const professions = new Professions();
    professions.position = this.position;
    professions.description = this.descripcion;
    professions.usuario = {
      id: this.user
    };
    professions.company =  {
      id: this.selectedItem
    };
    professions.since = this.since;
    professions.until = this.until;
    this.professionService.update(this.id, professions).subscribe(
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
  getInfo() {
    this.professionService.detail(this.id)
    .subscribe(items => {
      this.currentInfo = items
    })
  }
  getCompanies() {
    this.professionService.getCompanies()
    .subscribe(items => {
      this.companies = items;
      //console.log(this.institutes[0].institute);
    });
  }
}
