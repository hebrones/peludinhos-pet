import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models';

@Component({
  selector: 'app-card-produto',
  imports: [CommonModule],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css'
})
export class CardProduto {
  @Input() product!: IProduct;
  @Output() productClick = new EventEmitter<IProduct>();
  @Output() addToCart = new EventEmitter<IProduct>();

  onProductClick(): void {
    this.productClick.emit(this.product);
  }

  onAddToCart(event: Event): void {
    event.stopPropagation(); // Evita que o clique no botão dispare o clique no card
    this.addToCart.emit(this.product);
  }

  getDiscountedPrice(): number {
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }

  getCategoryClass(): string {
    const category = this.product.category.toLowerCase();
    switch (category) {
      case 'alimentação':
        return 'category-alimentacao';
      case 'higiene':
        return 'category-higiene';
      case 'acessórios':
        return 'category-acessorios';
      case 'brinquedos':
        return 'category-brinquedos';
      default:
        return '';
    }
  }
}
