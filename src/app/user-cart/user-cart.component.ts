import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  couponClickStatus:boolean =false
  cartTotalPrice:number=0
  couponStatus:boolean=false
allProducts:any=[]
constructor(private api:ApiService,private toaster:ToastrService,private router:Router){}
ngOnInit(): void {
  if(sessionStorage.getItem("token")){
    this.getCart()
  }
}

getCart(){
  this.api.getCartAPI().subscribe({
    next:(res:any)=>{
      this.allProducts = res
      console.log(this.allProducts);
      this.getCartTotal()
    },
    error:(reason:any)=>{
      this.toaster.warning(reason.error)
    }
  })
}
deleteItem(id:any){
  this.api.removeCartItem(id).subscribe({
    next:(res:any)=>{
      this.getCart();
      this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
  })
}
incrementQuantity(id:any){
  this.api.incrementCartAPI(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
  })
}

decrementQuantity(id:any){
  this.api.decrementCartAPI(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
  })
}
emptyCart(){
  this.api.emptyCartAPI().subscribe({
    next:(res:any)=>{
      this.getCart()
      this.api.getCartCount()
    },
    error:(reason:any)=>{
      console.log(reason.error);
      
    }
  })
}
getCartTotal(){
  this.cartTotalPrice = Math.ceil(this.allProducts.map((product:any)=>product.totalPrice).reduce(((p1:any,p2:any)=>p1+p2)))
}
getCoupon(){
  this.couponStatus = true
}
discount50(){
  this.couponClickStatus=true;
  let discount = Math.ceil(this.cartTotalPrice * 0.5)
  this.cartTotalPrice = this.cartTotalPrice - discount
}
discount20(){
  this.couponClickStatus=true;
  let discount = Math.ceil(this.cartTotalPrice * 0.2)
  this.cartTotalPrice = this.cartTotalPrice - discount
}
discount10(){
  this.couponClickStatus=true;
  let discount = Math.ceil(this.cartTotalPrice * 0.1)
  this.cartTotalPrice = this.cartTotalPrice - discount
}
checkout(){
  sessionStorage.setItem("cartTotalPrice",JSON.stringify(this.cartTotalPrice))
  this.router.navigateByUrl('/checkout')
}
}