import { Injectable, signal } from '@angular/core';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<{pizza: Pizza, quantity: number}[]>([]);
  private total = signal<number>(0);

  constructor() {
  
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
      this.updateTotal();
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotal() {
    return this.total;
  }

  addToCart(pizza: Pizza, quantity: number = 1) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.pizza.id === pizza.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { pizza, quantity }]);
    }

    this.updateTotal();
    this.saveToLocalStorage();
  }

  removeFromCart(pizzaId: number) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(item => item.pizza.id !== pizzaId);
    this.cartItems.set(updatedItems);
    this.updateTotal();
    this.saveToLocalStorage();
  }

  updateQuantity(pizzaId: number, quantity: number) {
    const currentItems = this.cartItems();
    const item = currentItems.find(item => item.pizza.id === pizzaId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(pizzaId);
      } else {
        item.quantity = quantity;
        this.cartItems.set([...currentItems]);
        this.updateTotal();
        this.saveToLocalStorage();
      }
    }
  }

  clearCart() {
    this.cartItems.set([]);
    this.total.set(0);
    localStorage.removeItem('cart');
  }

  private updateTotal() {
    const total = this.cartItems().reduce((sum, item) => {
      return sum + (item.pizza.price * item.quantity);
    }, 0);
    this.total.set(total);
  }

  private saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
} 