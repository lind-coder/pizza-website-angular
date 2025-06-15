import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pizza } from '../../services/pizza.service';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card h-100">
      <img [src]="pizza.image" class="card-img-top" [alt]="pizza.name">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title text-center">{{pizza.name}}</h5>
          <p class="card-text text-center">{{pizza.price | currency:'EUR'}}</p>
        </div>
        <div class="d-flex flex-column align-items-center mt-3 gap-2">
          <div class="btn-group mb-2" style="width: 120px;">
            <button class="btn btn-outline-primary" (click)="decrement()">-</button>
            <span class="btn btn-outline-primary disabled">{{quantity}}</span>
            <button class="btn btn-outline-primary" (click)="increment()">+</button>
          </div>
          <a [routerLink]="['/pizze', pizza.id]" class="btn btn-secondary w-100">Dettagli</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.3s;
      border: none;
      box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card-img-top {
      height: 200px;
      object-fit: cover;
    }
    .btn-group {
      width: 120px;
      justify-content: center;
    }
  `]
})
export class PizzaCardComponent {
  @Input() pizza!: Pizza;
  @Input() quantity: number = 0;
  @Output() quantityChange = new EventEmitter<number>();

  increment() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
} 
 