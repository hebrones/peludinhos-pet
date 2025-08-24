import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { IProduct } from '../../models';
import { ProductService, CartService } from '../../services';
import { CardProduto } from '../../components/card-produto/card-produto';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, CardProduto],
  templateUrl: './home.html',
  styleUrls: ['./home.css', './hero-banner.css']
})
export class Home implements OnInit, OnDestroy, AfterViewInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  loading = true;
  error = '';
  searchControl = new FormControl('');
  private subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.setupSearch();
    this.setupCategoryFilter();
  }

  ngAfterViewInit() {
    // Inicializar o carousel do Bootstrap
    const carouselElement = document.querySelector('#heroCarousel');
    if (carouselElement && typeof bootstrap !== 'undefined') {
      new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        wrap: true
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts(): void {
    this.loading = true;
    this.subscription.add(
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products || [];
          this.filteredProducts = [...this.products];
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erro ao carregar produtos. Tente novamente.';
          this.loading = false;
          console.error('Erro ao carregar produtos:', error);
        }
      })
    );
  }

  private setupSearch(): void {
    this.subscription.add(
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(searchTerm => {
        this.filterProducts(searchTerm || '');
      })
    );
  }

  private filterProducts(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    );
  }

  onProductClick(product: IProduct): void {
    this.router.navigate(['/produto', product.id]);
  }

  onAddToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    // Aqui você pode adicionar uma notificação de sucesso
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  performSearch(): void {
    // A busca já é realizada automaticamente através do valueChanges do searchControl
    // Este método pode ser usado para ações adicionais como analytics ou validações
    const searchTerm = this.searchControl.value;
    if (searchTerm && searchTerm.trim()) {
      // Força a aplicação do filtro se necessário
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  showAllProducts(): void {
    this.filteredProducts = [...this.products];
    this.searchControl.setValue('', { emitEvent: false });
  }

  private setupCategoryFilter(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        const category = params['category'];
        if (category) {
          this.filterByCategory(category);
        } else {
          this.filteredProducts = [...this.products];
        }
      })
    );
  }

  filterByCategory(category: string): void {
    if (!category) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    
    // Limpar a busca quando filtrar por categoria
    this.searchControl.setValue('', { emitEvent: false });
  }
}
