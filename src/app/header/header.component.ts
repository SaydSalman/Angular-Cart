import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  wishlistCount:number=0;
  cartCount:number=0;
  loginUsername:string=""
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(): void {
    if(sessionStorage.getItem("existingUser")){
      this.loginUsername = JSON.parse(sessionStorage.getItem("existingUser")|| "").username.split(" ")[0]
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCount = res
      })
      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount = res
      })
    }else{
      this.loginUsername = ""
    }
  }
  getSearchTerm(event:any){
    this.api.searchTerm.next(event.target.value)
  }
  logout(){
    sessionStorage.clear()
    this.loginUsername =""
    this.cartCount = 0
    this.wishlistCount =0
    this.router.navigateByUrl("/")
  }
  
}
