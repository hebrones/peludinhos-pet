import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'categoria/:category',
    loadComponent: () => import('./pages/category/category').then(m => m.Category)
  },
  {
    path: 'produto/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
