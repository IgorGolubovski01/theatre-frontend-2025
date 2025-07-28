import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  imports: [MatCardModule],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent {
  constructor(private router: Router) { }

  goToCart() {
    // Later: this.router.navigate(['/cart']);
    console.log('Navigating to cart...');
  }

  goToPurchases() {
    // Later: this.router.navigate(['/purchases']);
    console.log('Navigating to purchases...');
  }
}
