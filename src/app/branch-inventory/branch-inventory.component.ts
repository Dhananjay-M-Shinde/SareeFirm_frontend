import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-branch-inventory',
  templateUrl: './branch-inventory.component.html',
  styleUrls: ['./branch-inventory.component.css']
})

export class BranchInventoryComponent implements OnInit {

  showModal: boolean = false;
  showModalforupdate:boolean = false;
  productDatas: any = {}; // You can initialize it with empty object or set it when you receive data from the frontend
  userType:string | undefined;
  updateProduct: any = {};

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
  addQuantity:number = 0;
  changePriceTo:number = 0;

  cartItemCount: number = 0; // Initialize cart item count

  constructor(private inventory: InventoryService, private cartService: CartService, private router:Router, private route:ActivatedRoute, private userData:UserDataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const BranchIdStr = params.get('BranchId'); // Access the branchId parameter
      if(BranchIdStr){
        this.BranchId = +BranchIdStr;
      }
      console.log(this.BranchId);
    });

    this.getInventory(this.BranchId);
    this.userType = this.userData.userType;
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
      branchId: this.BranchId,
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
    this.showModalforupdate = false;
    this.quantity = 1; // Reset the quantity to 1
  }
  
  ToCart(){
    this.router.navigate(['/CartComponent']);
  }

  updateProducts(productId:number, color:string){
    this.showModalforupdate = true;
    this.color = color;
    this.productId = productId;
    this.branchId = this.userData.Branch_Id;
  }

  submitUpdateProduct(){
    const Price = this.changePriceTo;
    const quantity_Available = this.addQuantity;
    
    
    this.updateProduct = {
      price:Price,
      quantity:quantity_Available
    }
    this.inventory.updateProduct(this.branchId, this.productId, this.color, this.updateProduct).subscribe((response) =>{
      console.log("product updated succeesfully");
    }, (error) =>{
      console.log("product updation failed");
    })

    setTimeout(() => {
      this.closeModal();
      this.getInventory(this.BranchId);
    }, 2000);
  }
}
