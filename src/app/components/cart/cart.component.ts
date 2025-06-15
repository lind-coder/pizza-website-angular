import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      <h2 class="mb-4">Il tuo ordine</h2>
      
      @if (cartItems().length === 0) {
        <div class="text-center py-5">
          <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
          <h3>Il tuo carrello è vuoto</h3>
          <p class="text-muted">Aggiungi qualche pizza dal nostro menu!</p>
          <a routerLink="/menu" class="btn btn-danger mt-3">
            Vedi il Menu
          </a>
        </div>
      } @else {
        <div class="row">
          <div class="col-md-8">
            @for (item of cartItems(); track item.id) {
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-2">
                      <img [src]="item.image" class="img-fluid rounded" [alt]="item.title">
                    </div>
                    <div class="col-md-4">
                      <h5 class="card-title mb-0">{{item.title}}</h5>
                      <p class="text-muted mb-0">€{{item.price}}</p>
                    </div>
                    <div class="col-md-3">
                      <div class="d-flex align-items-center">
                        <button class="btn btn-outline-danger btn-sm" (click)="decrementQuantity(item)">
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-3">{{item.quantity}}</span>
                        <button class="btn btn-outline-danger btn-sm" (click)="incrementQuantity(item)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-md-2 text-end">
                      <p class="mb-0 fw-bold">€{{item.price * item.quantity}}</p>
                      <button class="btn btn-link text-danger p-0" (click)="removeItem(item)">
                        <i class="fas fa-trash"></i> Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Riepilogo Ordine</h5>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotale</span>
                  <span>€{{totalPrice()}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Consegna</span>
                  <span>€2.00</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <span class="fw-bold">Totale</span>
                  <span class="fw-bold">€{{totalPrice() + 2}}</span>
                </div>
                <button class="btn btn-danger w-100" (click)="checkout()">
                  Procedi all'ordine
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      @if (showModal()) {
        <div class="modal fade show" style="display: block;" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Ordine Confermato!</h5>
                <button type="button" class="btn-close" (click)="closeModal()"></button>
              </div>
              <div class="modal-body">
                <p>Grazie per il tuo ordine! La tua pizza arriverà presto.</p>
              </div>
              <div class="modal-footer">
                <a routerLink="/" class="btn btn-danger">Torna alla Home</a>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show"></div>
      }
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .btn-outline-danger {
      border-width: 2px;
    }
    .modal-backdrop {
      background-color: rgba(0,0,0,0.5);
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems = signal<any[]>([]);
  totalPrice = signal(0);
  showModal = signal(false);

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzaService.getCart().subscribe(items => {
      this.cartItems.set(items);
      this.calculateTotal();
    });
  }

  incrementQuantity(item: any) {
    this.pizzaService.addToCart(item);
    this.calculateTotal();
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      this.pizzaService.updateCartItem(item.id, item.quantity - 1);
    } else {
      this.removeItem(item);
    }
    this.calculateTotal();
  }

  removeItem(item: any) {
    this.pizzaService.removeFromCart(item.id);
    this.calculateTotal();
  }

  calculateTotal() {
    const total = this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalPrice.set(total);
  }

  checkout() {
    this.showModal.set(true);
    this.pizzaService.clearCart();
  }

  closeModal() {
    this.showModal.set(false);
  }
} 