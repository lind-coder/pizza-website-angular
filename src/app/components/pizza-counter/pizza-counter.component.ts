import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="btn-group">
      <button class="btn btn-outline-primary" (click)="decrement()" [disabled]="quantity <= 0">
        <i class="fas fa-minus"></i>
      </button>
      <span class="btn btn-outline-primary disabled">{{ quantity }}</span>
      <button class="btn btn-outline-primary" (click)="increment()">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  `,
  styles: [`
    .btn-group {
      .btn {
        padding: 0.5rem 1rem;
        font-size: 1.1rem;
      }
    }
  `]
})
export class PizzaCounterComponent {
  @Input() pizza!: Pizza;
  @Input() quantity: number = 0;
  @Output() quantityChange = new EventEmitter<{pizza: Pizza, quantity: number}>();

  increment(): void {
    this.quantity++;
    this.quantityChange.emit({pizza: this.pizza, quantity: this.quantity});
  }

  decrement(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit({pizza: this.pizza, quantity: this.quantity});
    }
  }
} 