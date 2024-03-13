import { Component, OnInit } from '@angular/core';
import { Professions } from '@app/shared/models/professions';
import { UserInstitutes } from '@app/shared/models/user-institutes';
import { UserDataService } from '@app/shared/services/userData.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  currentUser: any;
  userInstitutes: UserInstitutes[] = [];
  projects: any[] = [];
  professions: Professions[] = [];
  loading = true; // Estado de loading

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUsers();

    this.userDataService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.userDataService.userInstitutes$.subscribe(institutes => {
      this.userInstitutes = institutes;
    });

    this.userDataService.projects$.subscribe(projects => {
      this.projects = projects;
    });

    this.userDataService.professions$.subscribe(professions => {
      this.professions = professions;
    });
    this.userDataService.loading$.subscribe(loading => {
      this.loading = loading; // Actualizar estado de carga en el componente
      console.log(this.loading)
    });
  }

  onDeleteProject(id: number) {
    this.userDataService.onDeleteProject(id);
  }

  onDeleteProfession(id: number) {
    this.userDataService.onDeleteProfession(id);
  }

  onDeleteEduItem(id: number) {
    this.userDataService.onDeleteEduItem(id);
  }
}
