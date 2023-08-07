import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-branch-inventory',
  templateUrl: './branch-inventory.component.html',
  styleUrls: ['./branch-inventory.component.css']
})

export class BranchInventoryComponent implements OnInit {

  showModal: boolean = false;
  productDatas: any = {}; // You can initialize it with empty object or set it when you receive data from the frontend
  
  // "productId": 2,
  //       "branchId": 1,
  //       "productName": "Silk Saree",
  //       "color": "green",
  //       "quantity": 30,
  //       "totalAmount": 1700

  productId:number | undefined;
  productName:string | undefined;
  branchId:number | undefined;
  color:string | undefined;
  quantity:number = 1;
  totalAmount:number = 0;
  price:number = 0;

  constructor(private inventory: InventoryService, private cartService: CartService) {}

  ngOnInit() {
    this.getInventory();
  }

  productData: any[] = [];
  getInventory() {
    let id = 0;

    this.inventory.getInventoryByid(1).subscribe(
      (response) => {
        this.productData = response;
        // console.log(this.productData);

        this.productData.forEach((product) => {
          // console.log(product);
          // console.log(product.Branch_Id, product.Description, product.Varients[0].Color);
        });

        // this.initializeCarousel(); // Initialize carousel after data is fetched
      },
      (error) => {
        console.log('Error while fetching data');
      }
    );
  }

  addToCart(name:string, id:number, color:string, price:number): void {
    // this.productData = product;
    console.log(name, id, color, price);
    this.productId = id;
    this.productName = name;
    this.color = color;
    this.price = price;
    this.branchId = 1;
    this.showModal = true;
    this.quantity = 1;
  }

  onSubmit(): void {
    // this.cartService.addToCart(this.productData, this.quantity);  do it later when you create cartService
    this.productDatas = {
      productId: this.productId,
      branchId: 1,
      productName: this.productName,
      color: this.color,
      quantity: this.quantity,
      totalAmount: this.price*this.quantity
    };

    this.cartService.addToCart(this.productDatas);
    console.log("added to productcart services");
    

    this.showModal = false;
    this.quantity = 1; // Reset the quantity to 1
    
    console.log("form submitted");
    
  }

  closeModal(): void {
    this.showModal = false;
    this.quantity = 1; // Reset the quantity to 1
  }
  
}
