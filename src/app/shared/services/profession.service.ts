import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company';
import { Professions } from '../models/professions';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private professionsURL = 'https://ap-challenge-backend.onrender.com/auth/uerscompanies/';
  private companies = 'https://ap-challenge-backend.onrender.com/auth/companies/';

  getCompanies(): Observable<any> {
    return this.httpClient.get<Company[]>(this.companies + 'list')
    .pipe(
      map(res => {
        return res.map(item => {
            const data = item as Company;
            return data;
          }
        )
      })
    )
  }

  public addCompany(company: Company): Observable<any> {
    return this.httpClient.post<any>(this.companies + 'add', company);
  }

  constructor(private httpClient: HttpClient) { }
  
  public save(userProfession: Professions): Observable<any> {
    return this.httpClient.post<any>(this.professionsURL + 'add', userProfession);
  }
  public update(id: number, userProfession: Professions): Observable<any> {
    return this.httpClient.put<any>(this.professionsURL + `update/${id}`, userProfession);
  } 
  public lista(): Observable<any> {
    return this.httpClient.get<any>(this.professionsURL + 'list');
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.professionsURL + `delete/${id}`);
  }
  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.professionsURL + `detail/${id}`);
  }
}
