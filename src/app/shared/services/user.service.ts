import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../clases/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/auth/users/";

  constructor(private httpClient : HttpClient) {

  }
   //ESTE METODO SE COMUNICA CON EL BACK 
    public getUsersList():Observable<Users[]>{
    return this.httpClient.get<Users[]>(this.baseUrl + 'lista');
   }
    deleteUser(id:number) : Observable<Object> {
      return this.httpClient.delete(this.baseUrl + `delete/${id}`)
   }
    updateUser(id:number,user:Users) : Observable<Object>{
      return this.httpClient.put(this.baseUrl + `update/${id}`, user);
    }
    updateProfilePic(id:number,user:Users) : Observable<Object>{
      return this.httpClient.put(this.baseUrl + `updateImg/${id}`, user);
    }
    getUserById(id:number):Observable<Users>{
      return this.httpClient.get<Users>(this.baseUrl + `lista/${id}`);
    }
   
  
}
