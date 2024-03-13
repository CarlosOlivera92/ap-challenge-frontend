import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { TokenService } from '@app/shared/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUser } from '@app/shared/models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  userLogin : LoginUser;
  userEmail : string;
  password : string;
  roles : String[] = [];
  user : String[] = [];
  errMsj: string;
  loading = false; // Estado de loading

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.user = this.tokenService.getCurrentUserInfo();
    }
  }
  onLogin(): void {
    this.loading = true; // Activar el estado de loading
    this.userLogin = new LoginUser(this.userEmail, this.password);
    this.authService.login(this.userLogin).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setCurrentUserInfo(data.user);
        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + data.email, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
        this.loading = false; // Desactivar el estado de loading

      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.loading = false; // Desactivar el estado de loading en caso de error
        // console.log(err.error.message);
      }
    );
  }
}
