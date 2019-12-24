import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class FormationService {

  constructor(private http: HttpClient) { }

  getFormations(): Observable<any> {
    return this.http.get("./assets/formationMock.json");
  }

}

export default FormationService;
