import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productCart: any[] = [];

  constructor() { }

  addToCart(productData:[]){
    console.log("into productcart service");
    
    this.productCart.push(productData);
    console.log(this.productCart);
    
  }

}
