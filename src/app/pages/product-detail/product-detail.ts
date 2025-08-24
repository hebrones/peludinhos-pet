import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../models';
import { ProductService, CartService } from '../../services';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit, OnDestroy {
  product: IProduct | null = null;
  loading = true;
  error = '';
  selectedImageIndex = 0;
  quantity = 1;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        const productId = +params['id'];
        if (productId) {
          this.loadProduct(productId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadProduct(id: number): void {
    this.loading = true;
    this.error = '';
    
    this.subscription.add(
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          if (product) {
            this.product = product;
          } else {
            this.error = 'Produto não encontrado.';
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Produto não encontrado ou erro ao carregar.';
          this.loading = false;
          console.error('Erro ao carregar produto:', error);
        }
      })
    );
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      // Aqui você pode adicionar uma notificação de sucesso
      alert(`${this.quantity} ${this.product.title}(s) adicionado(s) ao carrinho!`);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getDiscountedPrice(): number {
    if (!this.product) return 0;
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }

  getStarArray(): number[] {
    if (!this.product) return [];
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  isStarFilled(star: number): boolean {
    if (!this.product) return false;
    return star <= Math.floor(this.product.rating);
  }

  isStarHalf(star: number): boolean {
    if (!this.product) return false;
    return star === Math.ceil(this.product.rating) && this.product.rating % 1 !== 0;
  }
}
