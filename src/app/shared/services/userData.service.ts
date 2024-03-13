import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '@app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { EducationServiceService } from '@app/shared/services/education-service.service';
import { UserInstitutes } from '@app/shared/models/user-institutes';
import { ProfessionService } from '@app/shared/services/profession.service';
import { Professions } from '@app/shared/models/professions';
import { ProjectsService } from '@app/shared/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userInstitutesSubject: BehaviorSubject<UserInstitutes[]> = new BehaviorSubject<UserInstitutes[]>([]);
  private projectsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private professionsSubject: BehaviorSubject<Professions[]> = new BehaviorSubject<Professions[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // Estado de carga

  public currentUser$ = this.currentUserSubject.asObservable();
  public userInstitutes$ = this.userInstitutesSubject.asObservable();
  public projects$ = this.projectsSubject.asObservable();
  public professions$ = this.professionsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable(); // Observable para el estado de carga

  userInfo = JSON.parse(sessionStorage.getItem('user')!);

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private userInstituteService: EducationServiceService,
    private professionsService: ProfessionService,
    private projectsService: ProjectsService
  ) {}

  getUsers(): void {
    this.loadingSubject.next(true); // Establecer estado de carga a true al comenzar la solicitud
    this.userService.getUsersList().subscribe({
      next: (data) => {
        const currentUser = data.find(user => user.id === this.userInfo.id);
        if (currentUser) {
          this.currentUserSubject.next(currentUser);

          this.userInstitutesSubject.next(currentUser.usuarioEducacion || []);
          this.projectsSubject.next(currentUser.projects || []);
          this.professionsSubject.next(currentUser.companiesUsuarios || []);

        }
        this.loadingSubject.next(false); // Establecer estado de carga a false cuando la solicitud se completa
      },
      error: (err) => {
        console.log(err);
        this.loadingSubject.next(false); // Establecer estado de carga a false en caso de error
      }
    });
  }

  onDeleteProject(id: number) {
    this.projectsService.delete(id).subscribe(
      data => {
        this.toastr.success('Proyecto Eliminado', 'OK', {
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

  onDeleteProfession(id: number) {
    this.professionsService.delete(id).subscribe(
      data => {
        this.toastr.success('Profesion Eliminada', 'OK', {
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
        this.toastr.success('Item de educación eliminado', 'OK', {
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
