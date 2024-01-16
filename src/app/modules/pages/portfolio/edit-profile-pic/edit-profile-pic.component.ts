import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '@app/shared/clases/users';
import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile-pic',
  templateUrl: './edit-profile-pic.component.html',
  styleUrls: ['./edit-profile-pic.component.scss']
})
export class EditProfilePicComponent implements OnInit {

  profilePicUrl:string = '';
  userInfo = JSON.parse(sessionStorage.getItem('user')!);
  user = this.userInfo.id
  constructor(private userService : UserService ,private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
  }
 
  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const currentUserInfo = new Users()
    currentUserInfo.profileUrl = this.profilePicUrl;
    this.userService.updateProfilePic(id, currentUserInfo).subscribe(
      data => {
        this.toastr.success('Foto Actualizada', 'OK', {
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
