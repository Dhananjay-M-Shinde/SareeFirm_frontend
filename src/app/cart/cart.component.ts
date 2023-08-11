import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUserCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  customerData!: FormGroup;
  fa = faUserCircle;
  faLock = faLock;
  faUserCircle = faUserCircle;
  productCart: any[] = [];
  price = 0;
  totalAmount = 0;
  defaultDate: string | undefined; // Add this property
  errorMsg = '';
  successMsg = '';


  // {
  //   "salesId": 21,
  //   "customerName": "mahesh",
  //   "customerMobile": "9857834509",
  //   "salesDate": "2023-08-05",
  //   "productCart": [
  //     {
  //       "productId": 2,
  //       "branchId": 1,
  //       "productName": "Silk Saree",
  //       "color": "green",
  //       "quantity": 30,
  //       "totalAmount": 1700
  //     },
  //     {
  //       "productId": 9,
  //       "branchId": 1,
  //       "productName": "Cotton Saree",
  //       "color": "maroon",
  //       "quantity": 25,
  //       "totalAmount": 1400
  //     }
  //   ],
  //   "totalAmount": 3100
  // }


  constructor(private cartService:CartService, private formBuilder:FormBuilder, private router:Router){

  }

  ngOnInit() {
    const date = new Date();
    this.defaultDate = new Date().toISOString().split('T')[0];
    this.productCart = this.cartService.productCart;

    this.customerData = this.formBuilder.group({
      salesId: ['', [Validators.required]],
      customerName: ['', Validators.required],
      customerMobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      salesDate: [this.defaultDate, Validators.required]
    });
    // console.log(this.productCart);
    this.calculateTotalAmount()

  }


  placeOrder(): void {
    const jsonData = {
      salesId: this.customerData.value.salesId,
      customerName: this.customerData.value.customerName,
      customerMobile: this.customerData.value.customerMobile,
      salesDate: this.customerData.value.salesDate,
      productCart: this.cartService.productCart, // Add the product data to the productCart array
      totalAmount: this.totalAmount // Set totalAmount based on the product data
    };
    console.log(jsonData);

    this.cartService.orderPlaced(jsonData).subscribe((response) =>{
      if(response){
        this.successMsg = "order placed successfully";
        this.errorMsg = '';
        this.generateAndDownloadPDF();
        console.log(response.message);

        setTimeout(() => {
          this.router.navigate(['/branchInventory']);
        }, 3000);
        
      }else{
        console.log("order not completed");  
      }
    }, (error) =>{
      if(error.status){
        console.log(error.status);
        console.log("order failed");
      }
      this.errorMsg = "order not completed"
      this.successMsg = '';
    })
    
  }

  updateQuantity(index: number, newQuantity: number): void {
    this.calculateTotalAmount();
  }

  removeProduct(index: number): void {
    this.cartService.productCart.splice(index, 1);
    this.productCart = this.cartService.productCart;
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.productCart.reduce((total, product) => total + product.totalAmount, 0);
  }

  // generateAndDownloadPDF(): void {
  //   const fonts = {
  //     Roboto: {
  //       normal: 'Roboto-Regular.ttf',
  //       bold: 'Roboto-Medium.ttf',
  //       italics: 'Roboto-Italic.ttf',
  //       bolditalics: 'Roboto-MediumItalic.ttf' 
  //     }
  //   };
  //   const pdfMakeInstance = pdfMake.createPdfKitDocument({ content: [] });
  // pdfMakeInstance['vfs'] = pdfFonts.pdfMake.vfs;
  // pdfMakeInstance['fonts'] = fonts;
  //   const pdfDefinition: any = {
  //     content: [
  //       { text: 'Sales Copy', style: 'header' },
  //       { text: `Order ID: ${this.customerData.value.salesId}` },
  //       { text: `Customer Name: ${this.customerData.value.customerName}` },
  //       { text: `Customer Mobile: ${this.customerData.value.customerMobile}` },
  //       { text: `Sales Date: ${this.customerData.value.salesDate}` },
  //       { text: 'Product Cart:', style: 'subheader' },
  //       {
  //         ul: this.cartService.productCart.map((product: any) => `Product Name: ${product.productName}, Color: ${product.color}, Quantity: ${product.quantity}, Total Amount: ${product.totalAmount}`)
  //       },
  //       { text: `Total Amount: ${this.totalAmount}`, style: 'total' }
  //     ],
  //     styles: {
  //       header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
  //       subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
  //       total: { fontSize: 16, bold: true, margin: [0, 10, 0, 0] }
  //     }
  //   };

  //   pdfMake.createPdf(pdfDefinition).download('sales_copy.pdf');
  // }

  generateAndDownloadPDF(): void {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('Sales Copy', 10, 10);

    pdf.setFontSize(11);
    pdf.text(`Order ID: ${this.customerData.value.salesId}`, 10, 20);
    pdf.text(`Customer Name: ${this.customerData.value.customerName}`, 10, 30);
    pdf.text(`Customer Mobile: ${this.customerData.value.customerMobile}`, 10, 40);
    pdf.text(`Sales Date: ${this.customerData.value.salesDate}`, 10, 50);

    pdf.setFontSize(12);
    pdf.text('Product Cart:', 10, 60);

    let yPos = 70;
    this.cartService.productCart.forEach((product: any) => {
      pdf.text(`Product Name: ${product.productName}`, 10, yPos);
      pdf.text(`Color: ${product.color}`, 80, yPos);
      pdf.text(`Quantity: ${product.quantity}`, 120, yPos);
      pdf.text(`Total Amount: ${product.totalAmount}`, 150, yPos);
      yPos += 10;
    });

    pdf.setFontSize(16);
    pdf.text(`Total Amount: ${this.totalAmount}`, 10, yPos + 20);

    pdf.save('sales_copy.pdf');
  }

}
