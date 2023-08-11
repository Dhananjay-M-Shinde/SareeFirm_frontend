import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000';
  productCart: any[] = [];
  productInCart:number = 0

  constructor(private http:HttpClient) { }

  addToCart(productData:[]){
    this.productCart.push(productData);
    this.productInCart+=1;
  }

  orderPlaced(order:any){
    return this.http.post<any>(`${this.apiUrl}/order/orderPlaced`, order);
  }

}
