import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from '@app/shared/models/new-user';
import { AuthService } from '@app/shared/services/auth.service';
import { TokenService } from '@app/shared/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nuevoUsuario: NewUser;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  password: string;
  telefono: number;
  birthday: Date;
  profileUrl: string = "https://t3.ftcdn.net/jpg/05/05/59/94/360_F_505599409_kpP9a01lXkN7XR3anYaHSFVFzEP1E7fn.jpg";
  about: string = "texto por defecto";
  roles: string[] = ["user"];
  errMsj: string;
  isLogged = false;
  loading = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.loading = true; // Activar el estado de loading
    this.nuevoUsuario = new NewUser(this.nombre, this.apellido, this.nombreUsuario, this.email, this.password, this.telefono, this.birthday, this.roles, this.about);
    this.authService.newUser(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.loading = false; // Desactivar el estado de loading en caso de error
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
