import { Component } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-my-purchases',
  imports: [],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.css'
})
export class MyPurchasesComponent {

    orders: OrderModel[] = []
  
    constructor(){
      const userString = localStorage.getItem('active')
      if(!userString){
        console.log("Not logged in")
        return
      }
  
      const user = JSON.parse(userString)
      const userId = user.id
      
  
      CartService.getPurchasedItems(userId)
      .then(rsp =>{
        this.orders = rsp.data
      })
      .catch(error => {
        console.error('Failed to load card items.', error)
      })
  
  
  
    }

}
