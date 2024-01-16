import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '@app/shared/clases/users';
import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  currentInfo;
  nombre = '';
  apellido = '';
  about = '';
  birthday: Date;
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  user = this.userInfo.id
  constructor(private userService : UserService ,private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getInfo();
  }
 
  onUpdate(): void {
    const currentUserInfo = new Users()
    currentUserInfo.nombre = this.nombre;
    currentUserInfo.apellido = this.apellido;
    currentUserInfo.about = this.about;
    currentUserInfo.birthday = this.birthday;
    this.userService.updateUser(this.id, currentUserInfo).subscribe(
      data => {
        this.toastr.success('Usuario Actualizado', 'OK', {
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
    this.userService.getUserById(this.id)
    .subscribe(items => {
      this.currentInfo = items
    })
  }
}
