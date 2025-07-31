import { Component } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { CartService } from '../services/cart.service';
import { LoadingComponent } from "../loading/loading.component";
import { ErrorComponent } from "../error/error.component";
import { MatCardModule } from "@angular/material/card";
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ProjectionService } from '../services/projection.service';
import { AxiosError } from 'axios';
import { ProjectionModel } from '../models/projection.model';

@Component({
  selector: 'app-my-purchases',
  imports: [LoadingComponent, ErrorComponent, MatCardModule, DatePipe, NgIf, NgFor],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.css'
})
export class MyPurchasesComponent {

  public error: string|null = null
  orders: OrderModel[] = []
  projection: ProjectionModel|null = null

  constructor() {
    const userString = localStorage.getItem('active')
    if (!userString) {
      console.log("Not logged in")
      return
    }

    const user = JSON.parse(userString)
    const userId = user.id


    CartService.getPurchasedItems(userId)
          .then(async rsp => {
            const enrichedOrders = await Promise.all(
              rsp.data.map(async (order: OrderModel) => {
                const projectionId = order.tickets[0]?.projectionId;
                if (projectionId !== undefined) {
                  try {
                    const response = await ProjectionService.getProjectionById(projectionId)
                    const projectionName = response.data.name
                    const projectionDate = response.data.projectionDate
                    console.log(projectionDate);

                    
                    return { ...order, projectionName}
                  } catch (error) {
                    console.error('Error fetching projection:', error)
                  }
                }
    
                return { ...order, projectionName: 'Unknown'};
              })
            );
    
            this.orders = enrichedOrders;
          })
          .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)



  }



}
