import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetProductsService } from '../../services/pet-products.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../models';
import { CardProduto } from '../../components/card-produto/card-produto';

@Component({
  selector: 'app-category',
  imports: [CommonModule, CardProduto],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit, OnDestroy {
  products: IProduct[] = [];
  category: string = '';
  loading = true;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petProductsService: PetProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.category = params['category'];
        this.loadCategoryProducts();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCategoryProducts(): void {
    this.loading = true;
    this.subscription.add(
      this.petProductsService.getProductsByCategory(this.category).subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Erro ao carregar produtos da categoria:', error);
          this.loading = false;
        }
      })
    );
  }

  onProductClick(product: IProduct): void {
    this.router.navigate(['/product', product.id]);
  }

  onAddToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }

  getCategoryIcon(): string {
    switch (this.category.toLowerCase()) {
      case 'alimentação':
        return 'bi-cup-straw';
      case 'higiene':
        return 'bi-droplet';
      case 'acessórios':
        return 'bi-bag';
      case 'brinquedos':
        return 'bi-controller';
      default:
        return 'bi-grid-3x3-gap';
    }
  }

  getCategoryColor(): string {
    switch (this.category.toLowerCase()) {
      case 'alimentação':
        return 'text-success';
      case 'higiene':
        return 'text-info';
      case 'acessórios':
        return 'text-warning';
      case 'brinquedos':
        return 'text-primary';
      default:
        return 'text-secondary';
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}