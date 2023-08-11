import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchDataService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getBranchData(): Observable <any> {
    console.log("into service");
    
    return this.http.get<any>(`${this.apiUrl}/branch`);
  }

  sendOtp(newBranch:any){
    return this.http.post<any>(`${this.apiUrl}/branch/addNewBranch/SendOtp`, newBranch);
  }

  addNewBranch(otp:number, branchData:any){
    console.log(branchData);
    return this.http.post<any>(`${this.apiUrl}/branch/addNewBranch/Register/${otp}`, branchData);
  }

}
