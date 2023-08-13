import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Route, Router } from '@angular/router';


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
  BranchId:number | undefined;
  productId:number | undefined;
  productName:string | undefined;
  branchId:number | undefined;
  color:string | undefined;
  quantity:number = 1;
  totalAmount:number = 0;
  price:number = 0;

  cartItemCount: number = 0; // Initialize cart item count

  constructor(private inventory: InventoryService, private cartService: CartService, private router:Router, private cdr:ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const BranchIdStr = params.get('BranchId'); // Access the branchId parameter
      if(BranchIdStr){
        this.BranchId = +BranchIdStr;
      }
      console.log(this.BranchId);
    });

    this.getInventory(this.BranchId);
  }

  productData: any[] = [];
  getInventory(branchId:any) {
    let id = 0;

    this.inventory.getInventoryByid(branchId).subscribe(
      (response) => {
        this.productData = response;
      },
      (error) => {
        console.log('Error while fetching data');
      }
    );
  }

  addToCart(name:string, id:number, color:string, price:number): void {
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
    this.cartItemCount = this.cartService.productInCart;

    console.log(this.cartItemCount);

    this.showModal = false;
    this.quantity = 1; // Reset the quantity to 1
    
  }

  closeModal(): void {
    this.showModal = false;
    this.quantity = 1; // Reset the quantity to 1
  }
  
  ToCart(){
    this.router.navigate(['/CartComponent']);
  }
}
