import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  cartItemCount = 0;
  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getTotalItems().subscribe(count => {
        this.cartItemCount = count;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterByCategory(category: string): void {
    // Navegar para a página específica da categoria
    this.router.navigate(['/categoria', category]);
  }

  showAllProducts(): void {
    // Navegar para a home sem filtros
    this.router.navigate(['/']);
  }

  goToCart(): void {
    // Navegar para a página do carrinho/checkout
    this.router.navigate(['/checkout']);
  }

  // Easter egg methods for heart icon
  onHeartHover(): void {
    // Adiciona classe de animação no hover
    const heartIcon = document.querySelector('.heart-easter-egg');
    if (heartIcon) {
      heartIcon.classList.add('heart-hover');
    }
  }

  onHeartLeave(): void {
    // Remove classe de animação quando sai do hover
    const heartIcon = document.querySelector('.heart-easter-egg');
    if (heartIcon) {
      heartIcon.classList.remove('heart-hover');
    }
  }

  onHeartClick(): void {
    // Efeito especial ao clicar no coração
    const heartIcon = document.querySelector('.heart-easter-egg');
    if (heartIcon) {
      heartIcon.classList.add('heart-clicked');
      
      // Cria corações flutuantes
      this.createFloatingHearts();
      
      // Remove a classe após a animação
      setTimeout(() => {
        heartIcon.classList.remove('heart-clicked');
      }, 600);
    }
  }

  private createFloatingHearts(): void {
    const container = document.querySelector('.navbar-brand');
    if (!container) return;

    // Cria 5 corações flutuantes
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement('span');
      heart.innerHTML = '💖';
      heart.className = 'floating-heart';
      heart.style.left = Math.random() * 100 + 'px';
      heart.style.animationDelay = i * 0.1 + 's';
      
      container.appendChild(heart);
      
      // Remove o coração após a animação
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 2000);
    }
  }
}
