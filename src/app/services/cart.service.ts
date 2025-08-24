import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem, IProduct } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  public cartItems$: Observable<ICartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {
    // Carrega itens do localStorage se existirem
    this.loadCartFromStorage();
  }

  /**
   * Adiciona um produto ao carrinho
   * @param product Produto a ser adicionado
   * @param quantity Quantidade (padrão: 1)
   */
  addToCart(product: IProduct, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      // Se o produto já existe, aumenta a quantidade
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      // Se é um novo produto, adiciona ao carrinho
      currentItems.push({ product, quantity });
    }

    this.updateCart(currentItems);
  }

  /**
   * Remove um produto do carrinho
   * @param productId ID do produto a ser removido
   */
  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.updateCart(updatedItems);
  }

  /**
   * Atualiza a quantidade de um produto no carrinho
   * @param productId ID do produto
   * @param quantity Nova quantidade
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = quantity;
      this.updateCart(currentItems);
    }
  }

  /**
   * Limpa todo o carrinho
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * Retorna o número total de itens no carrinho
   * @returns Observable com o total de itens
   */
  getTotalItems(): Observable<number> {
    return new Observable(observer => {
      this.cartItems$.subscribe(items => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        observer.next(total);
      });
    });
  }

  /**
   * Retorna o valor total do carrinho
   * @returns Observable com o valor total
   */
  getTotalPrice(): Observable<number> {
    return new Observable(observer => {
      this.cartItems$.subscribe(items => {
        const total = items.reduce((sum, item) => {
          const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
          return sum + (discountedPrice * item.quantity);
        }, 0);
        observer.next(total);
      });
    });
  }

  /**
   * Atualiza o carrinho e salva no localStorage
   * @param items Novos itens do carrinho
   */
  private updateCart(items: ICartItem[]): void {
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  /**
   * Salva o carrinho no localStorage
   * @param items Itens do carrinho
   */
  private saveCartToStorage(items: ICartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  /**
   * Carrega o carrinho do localStorage
   */
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items: ICartItem[] = JSON.parse(savedCart);
        this.cartItemsSubject.next(items);
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }
}