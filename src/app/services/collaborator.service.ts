import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICollaborator } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCollaborators(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees`);
  }

  getCollaborator(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees/${id}`);
  }

  createCollaborator(collaborator: ICollaborator | FormData): Observable<any> {
    console.log(collaborator);
    return this.http.post<any>(`${this.apiUrl}/employees`, collaborator);
  }

  deleteCollaborator(id: number): Observable<any> {
    console.log('id:',id);
    return this.http.delete<any>(`${this.apiUrl}/employees/${id}`);
  }

  updateCollaborator(id: number, collaborator: ICollaborator | FormData): Observable<any> {
    console.log(collaborator);
    
    return this.http.post<any>(`${this.apiUrl}/employees/${id}`, collaborator);
  }
}
