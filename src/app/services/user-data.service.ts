
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint
  userType:string = '';
  Branch_Id:number | undefined;

  constructor(private http: HttpClient) {}

  userTypes(user:string){
    this.userType = user;
  }

  postData(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/api/login`, data);
  }
}

