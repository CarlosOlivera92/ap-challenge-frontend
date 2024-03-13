import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from '../clases/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://ap-challenge-backend.onrender.com/auth/users/";

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // Método para obtener la lista de usuarios
  public getUsersList(): Observable<Users[]> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.get<Users[]>(this.baseUrl + 'list').pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        throw new Error(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }

  // Método para eliminar un usuario por su ID
  deleteUser(id: number): Observable<Object> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.delete(this.baseUrl + `delete/${id}`).pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        throw new Error(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }

  // Método para actualizar un usuario por su ID
  updateUser(id: number, user: Users): Observable<Object> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.put(this.baseUrl + `update/${id}`, user).pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        throw new Error(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }

  // Método para actualizar la imagen de perfil de un usuario por su ID
  updateProfilePic(id: number, user: Users): Observable<Object> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.put(this.baseUrl + `updateImg/${id}`, user).pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        throw new Error(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }

  // Método para obtener un usuario por su ID
  getUserById(id: number): Observable<Users> {
    this.loadingSubject.next(true); // Activar el estado de loading
    return this.httpClient.get<Users>(this.baseUrl + `list/${id}`).pipe(
      tap(() => this.loadingSubject.next(false)), // Desactivar el estado de loading en caso de éxito
      catchError((error) => {
        this.loadingSubject.next(false); // Desactivar el estado de loading en caso de error
        throw new Error(error); // Relanzar el error para que el componente lo maneje
      })
    );
  }
}
