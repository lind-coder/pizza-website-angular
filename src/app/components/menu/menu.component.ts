import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      <h1 class="text-center mb-5">Il Nostro Menu</h1>
      <div class="row g-4">
        @for (pizza of pizzas(); track pizza.id) {
          <div class="col-md-6 col-lg-4">
            <div class="card h-100">
              <img [src]="pizza.image" [alt]="pizza.name" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{{ pizza.name }}</h5>
                <p class="card-text">{{ pizza.description }}</p>
                <p class="card-text"><strong>€{{ pizza.price }}</strong></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button class="btn btn-outline-danger" (click)="decrementQuantity(pizza)" [disabled]="getQuantity(pizza) === 0">-</button>
                    <span class="btn btn-outline-secondary disabled">{{ getQuantity(pizza) }}</span>
                    <button class="btn btn-outline-danger" (click)="incrementQuantity(pizza)">+</button>
                  </div>
                  <a [routerLink]="['/pizza', pizza.id]" class="btn btn-outline-danger">Dettagli</a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .card-img-top {
      height: 200px;
      object-fit: cover;
    }
  `]
})
export class MenuComponent implements OnInit {
  pizzas = signal<Pizza[]>([]);
  cartItems = signal<Pizza[]>([]);

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas.set(pizzas);
    });

    this.pizzaService.getCart().subscribe(items => {
      this.cartItems.set(items);
    });
  }

  getQuantity(pizza: Pizza): number {
    const cartItem = this.cartItems().find(item => item.id === pizza.id);
    return cartItem?.quantity || 0;
  }

  incrementQuantity(pizza: Pizza) {
    this.pizzaService.addToCart(pizza);
  }

  decrementQuantity(pizza: Pizza) {
    const currentQuantity = this.getQuantity(pizza);
    if (currentQuantity > 0) {
      this.pizzaService.updateCartItem(pizza.id, currentQuantity - 1);
    }
  }
}
