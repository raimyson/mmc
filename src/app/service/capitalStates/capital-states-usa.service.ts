import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CapitalData } from 'src/app/models/capitalstates.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapitalStatesUsaService {

  constructor(private http: HttpClient) { }

  getListCapitalStates(): Observable <CapitalData[]>{
    return this.http.get<CapitalData[]>(environment.listCapitalStatusUSA)
  }
}
