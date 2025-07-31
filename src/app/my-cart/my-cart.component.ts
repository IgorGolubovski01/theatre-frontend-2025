import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderModel } from '../models/order.model';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ProjectionService } from '../services/projection.service';
import { UtilsService } from '../services/utils.service';
import { AxiosError } from 'axios';
import { ErrorComponent } from "../error/error.component";
import { LoadingComponent } from "../loading/loading.component";


@Component({
  selector: 'app-my-cart',
  imports: [ MatCardModule, NgFor, DatePipe, ErrorComponent, NgIf, LoadingComponent],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent {

  public error : string|null = null
  orders: OrderModel[] = [];
  service = UtilsService
  constructor() {
    const userString = localStorage.getItem('active');
    if (!userString) {
      console.log("Not logged in");
      return;
    }

    const user = JSON.parse(userString);
    const userId = user.id;

    CartService.getCartItems(userId)
      .then(async rsp => {
        const enrichedOrders = await Promise.all(
          rsp.data.map(async (order: OrderModel) => {
            const projectionId = order.tickets[0]?.projectionId;

            if (projectionId !== undefined) {
              try {
                const response = await ProjectionService.getProjectionById(projectionId);
                const projectionName = response.data.name;
                return { ...order, projectionName };
              } catch (error) {
                console.error('Error fetching projection:', error);
              }
            }

            return { ...order, projectionName: 'Unknown' };
          })
        );

        this.orders = enrichedOrders;
      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  deleteCart(id: number) {
    CartService.deleteOrderById(id)
      .then(() => {
        this.orders = this.orders.filter(order => order.orderId !== id);
      })
      .catch(err => {
        console.error('Failed to delete order:', err);
      });
  }

  async purchase(orderId: number) {

    try {
      await CartService.purchaseOrder(orderId)
      this.orders = this.orders.filter(o => o.orderId !== orderId);
      alert("Purchased successfuly")
    } catch (error) {
      console.error("Failed", error)
    }
  }

}