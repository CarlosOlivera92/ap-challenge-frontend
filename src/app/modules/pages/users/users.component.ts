import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Users } from '@app/shared/clases/users';
import { TokenService } from '@app/shared/services/token.service';
import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  roles: String[];
  isAdmin = false;
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  currentUser;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getUsers(): void {
    this.userService.getUsersList().subscribe(
      data => {
        this.users = data;
        for (let i of this.users) {
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
  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.getUsers();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
