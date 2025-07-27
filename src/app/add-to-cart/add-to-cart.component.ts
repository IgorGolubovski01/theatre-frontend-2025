import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectionModel } from '../models/projection.model';
import { ProjectionService } from '../services/projection.service';
import { UserService } from '../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
  imports: [MatCardModule, MatInputModule, FormsModule, NgFor, NgIf]
})
export class AddToCartComponent {
  userService = UserService
  cartService = CartService

  dataSource: ProjectionModel[] | null = null;
  ticketQuantity: number = 1;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      ProjectionService.getProjectionById(params['id']).then((rsp) => {
        this.dataSource = [rsp.data];
        const maxTickets = this.dataSource[0].projectionCapacity - this.dataSource[0].soldTickets;
        this.ticketQuantity = maxTickets > 0 ? 1 : 0;
      });
    });
  }

  onAddToCart() {
    this.cartService.addToCart()
  }
}
