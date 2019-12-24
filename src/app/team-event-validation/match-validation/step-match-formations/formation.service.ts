import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class FormationService {

  constructor(private http: HttpClient) { }

  getFormations(): Observable<any> {
    return this.http.get("./assets/mocks/formation.mock.json");
  }

  getPlayers() {
    return this.http.get("./assets/mocks/players.mock.json");
  }

}

export default FormationService;
