import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getInventoryByid(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/products/`+id);
  }

  updateProduct(branchId:any, productId:any, color:any, updationData:any){
    // updateProduct/:branch_id/:product_id/:color
    return this.http.put<any>(`${this.apiUrl}/products/updateProduct/${branchId}/${productId}/${color}`, updationData)
  }
}
