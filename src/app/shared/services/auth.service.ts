import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'https://ap-challenge-backend.onrender.com/auth/';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public newUser(newUser: NewUser): Observable<any> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.post<any>(this.authUrl + 'nuevo', newUser).pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        return throwError(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.post<JwtDTO>(this.authUrl + 'login', loginUser).pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        return throwError(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }
}
