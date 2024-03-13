import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InstitutosEd } from '../models/institutos-ed';
import { UserInstitutes } from '../models/user-institutes';

@Injectable({
  providedIn: 'root'
})
export class EducationServiceService {

  userInstitutesURL = 'https://ap-challenge-backend.onrender.com/auth/userinstitutes/';
  InstitutesURL = 'https://ap-challenge-backend.onrender.com/auth/institutes/';
  
   getInstitute(): Observable<any> {
    return this.httpClient.get<InstitutosEd[]>(this.InstitutesURL + 'list')
    .pipe(
      map(res => {
        return res.map(item => {
            const data = item as InstitutosEd;
            return data;
          }
        )
      })
    )
  }

  public addInstitute(institute: InstitutosEd): Observable<any> {
    return this.httpClient.post<any>(this.InstitutesURL + 'add', institute);
  }


  constructor(private httpClient : HttpClient) { }

  public save(userEducation: UserInstitutes): Observable<any> {
    return this.httpClient.post<any>(this.userInstitutesURL + 'add', userEducation);
  }
  public update(id: number, userEducation: UserInstitutes): Observable<any> {
    return this.httpClient.put<any>(this.userInstitutesURL + `update/${id}`, userEducation);
  }
  public lista(): Observable<any> {
    return this.httpClient.get<any>(this.userInstitutesURL + 'list');
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.userInstitutesURL + `delete/${id}`);
  }
  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.userInstitutesURL + `detail/${id}`);
  }
}
