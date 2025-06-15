import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'https://my-json-server.typicode.com/zoelounge/menupizza/cards';
  private cart = new BehaviorSubject<Pizza[]>([]);

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  getCart(): Observable<Pizza[]> {
    return this.cart.asObservable();
  }

  addToCart(pizza: Pizza, quantity: number = 1) {
    if (quantity <= 0) {
      console.warn('Quantità non valida. Non è possibile aggiungere al carrello.');
      return; 
    }

    const existingItemIndex = this.cart.value.findIndex(item => item.id === pizza.id);
    if (existingItemIndex !== -1) {
       const updatedCart = [...this.cart.value];
      updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity ?? 0) + quantity;
      this.cart.next(updatedCart);
    } else {
      
      this.cart.next([...this.cart.value, { ...pizza, quantity }]);
    }
  }

  updateCartItem(pizzaId: number, quantity: number) {
    const currentCart = this.cart.value;
    if (quantity <= 0) {
      this.cart.next(currentCart.filter(item => item.id !== pizzaId));
    } else {
      const updatedCart = currentCart.map(item =>
        item.id === pizzaId ? { ...item, quantity } : item
      );
      this.cart.next(updatedCart);
    }
  }

  removeFromCart(id: number) {
    const currentCart = this.cart.value;
    this.cart.next(currentCart.filter(item => item.id !== id));
  }

  clearCart() {
    this.cart.next([]);
  }

  getTotal(): number {
    return this.cart.value.reduce((total, item) => total + (item.price * (item.quantity ?? 0)), 0);
  }
} 

export type { Pizza };
