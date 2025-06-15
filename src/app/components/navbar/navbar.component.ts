import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-pizza-slice me-2"></i>
          Anema e Core
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/menu" routerLinkActive="active">
                Menu
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link position-relative" routerLink="/cart">
                Carrello
                <span *ngIf="cartItemCount() > 0"
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {{cartItemCount()}}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .navbar-brand {
      font-weight: 600;
      font-size: 1.5rem;
    }
  `]
})
export class NavbarComponent implements OnInit {
  cartItemCount = signal(0);

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.pizzaService.getCart().subscribe(items => {
      this.cartItemCount.set(items.reduce((total, item) => total + (item.quantity || 0), 0));
    });
  }
} 