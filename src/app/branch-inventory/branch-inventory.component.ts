import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-branch-inventory',
  templateUrl: './branch-inventory.component.html',
  styleUrls: ['./branch-inventory.component.css']
})

export class BranchInventoryComponent implements OnInit {

  productForm!: FormGroup;
  variantForm!: FormGroup;
  showModal: boolean = false;
  showModalforupdate:boolean = false;
  showModalfornewproduct:boolean = false;
  showModalfornewVariant:boolean = false;
  productDatas: any = {}; // You can initialize it with empty object or set it when you receive data from the frontend
  userType:string | undefined;
  updateProduct: any = {};
  errorMsg:string = '';
  successMsg:string = '';

  productIdVariant:number | undefined;

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
  productData: any[] = [];

  constructor(private inventory: InventoryService, private cartService: CartService, private router:Router, private route:ActivatedRoute, private userData:UserDataService, private fb: FormBuilder) {
    
  }

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

    this.productForm = this.fb.group({
      Product_Id: ['', [Validators.required]],
      Branch_Id: ['', [Validators.required]],
      Product_name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Fabric : ['', [Validators.required]],
      Price_range: ['', [Validators.required]],
      Varients: this.fb.array([this.getVariantFields()]),
    });

    this.variantForm = this.fb.group({
      Color: ['', [Validators.required]],
      Price:['', [Validators.required]],
      Design:['', [Validators.required]],
      Image: ['', [Validators.required]],
      Quantity_Available: ['', [Validators.required]]
    })

  }

  
  getInventory(branchId:any) {
    let id = 0;

    this.inventory.getInventoryByid(branchId).subscribe(
      (response) => {
        this.productData = response;
        console.log(this.productData);
        
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
    this.quantity = 1;
    this.showModal = true;
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
    this.showModalfornewproduct = false;
    this.quantity = 1; // Reset the quantity to 1
    this.showModalfornewVariant = false;
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

  addNewProduct(){
    this.showModalfornewproduct = true;
  }

  getVariantFields(): FormGroup {
    return this.fb.group({
      Color: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Design: ['', [Validators.required]],
      Image: ['', [Validators.required]],
      Quantity_Available: ['', [Validators.required]]
    });
  }

  variantsArray() {
    return this.productForm.get('Varients') as FormArray;
  }

  addVariant() {
    this.variantsArray().push(this.getVariantFields());
  }

  removeVariant(i: number) {
    this.variantsArray().removeAt(i);
  }

  saveProduct() {
    // Implement your logic to save the product data
    const productData = this.productForm.value;
    console.log(productData);
    
    this.inventory.addNewProduct(this.productForm.value).subscribe((response) =>{
      console.log("new product added succesfully");
    }, (error) =>{
      console.log("new product cannot be added");
      
    })
  }

  newVariantModal(productId:number){
    this.productIdVariant = productId;
    this.showModalfornewVariant = true;
  }

  newVariant(){
    this.inventory.addNewVariant(this.productIdVariant, this.BranchId, this.variantForm.value).subscribe((response) =>{
      console.log("new variant added succesfully");
      this.successMsg = "new varient added succesfully!";
      setTimeout(() => {
        this.errorMsg = '';
        this.showModalfornewVariant = false;
        this.getInventory(this.BranchId);
      }, 3000);
    }, (error) =>{
      if(error.status == 401){
        this.errorMsg = "Product with this color varient is already available";
      }
      this.successMsg = '';
    })
  }
}
