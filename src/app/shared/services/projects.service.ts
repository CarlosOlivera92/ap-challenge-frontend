import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Projects } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = 'http://localhost:8080/auth/projects/';

  getProjects(): Observable<any> {
    return this.httpClient.get<Projects[]>(this.projectsUrl + 'list')
    .pipe(
      map(res => {
        return res.map(item => {
            const data = item as Projects;
            return data;
          }
        )
      })
    )
  }
  constructor(private httpClient: HttpClient) { }
  
  public save(userProject: Projects): Observable<any> {
    return this.httpClient.post<any>(this.projectsUrl + 'add', userProject);
  }
  public update(id: number, userProject: Projects): Observable<any> {
    return this.httpClient.put<any>(this.projectsUrl + `update/${id}`, userProject);
  } 
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.projectsUrl + `delete/${id}`);
  }
  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(this.projectsUrl + `detail/${id}`);
  }
}
