import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5">
      @if (loading()) {
        <div class="text-center">
          <p>Caricamento...</p>
        </div>
      } @else if (pizza()) {
        <div class="row">
          <div class="col-md-6">
            <img [src]="pizza()?.image" [alt]="pizza()?.name" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <h1 class="mb-4">{{ pizza()?.name }}</h1>
            <p class="lead mb-4">{{ pizza()?.description }}</p>
            <p class="h3 mb-4">€{{ pizza()?.price }}</p>
            <a routerLink="/menu" class="btn btn-outline-danger">Torna al Menu</a>
          </div>
        </div>
      } @else {
        <div class="text-center">
          <p>Pizza non trovata</p>
          <a routerLink="/menu" class="btn btn-outline-danger">Torna al Menu</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .img-fluid {
      max-height: 500px;
      width: 100%;
      object-fit: cover;
    }
  `]
})
export class PizzaDetailComponent implements OnInit {
  pizza = signal<Pizza | null>(null);
  quantity = signal<number>(0);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizzas().subscribe(pizzas => {
      const pizza = pizzas.find(p => p.id === id);
      if (pizza) {
        this.pizza.set(pizza);
        this.pizzaService.getCart().subscribe(items => {
          const item = items.find(item => item.id === id);
          this.quantity.set(item?.quantity ?? 0);
          this.loading.set(false);
        });
      } else {
        this.loading.set(false);
      }
    });
  }
}
