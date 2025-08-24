import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../models/cart-item.interface';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  cartItems: ICartItem[] = [];
  totalPrice = 0;
  totalItems = 0;
  isSubmitting = false;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        
        // Redirecionar se carrinho estiver vazio
        if (items.length === 0) {
          this.router.navigate(['/']);
        }
      })
    );
    
    // Subscribe to total price
      this.subscription.add(
        this.cartService.getTotalPrice().subscribe(price => {
          this.totalPrice = price;
        })
      );
      
      // Subscribe to total items
      this.subscription.add(
        this.cartService.getTotalItems().subscribe(items => {
          this.totalItems = items;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm(): void {
    this.checkoutForm = this.fb.group({
      // Dados pessoais
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      
      // Endereço
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      
      // Pagamento
      paymentMethod: ['credit', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', [Validators.required, Validators.minLength(2)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) {
        switch (fieldName) {
          case 'phone': return 'Telefone deve ter 10 ou 11 dígitos';
          case 'zipCode': return 'CEP deve ter formato 00000-000';
          case 'cardNumber': return 'Número do cartão deve ter 16 dígitos';
          case 'expiryDate': return 'Data deve ter formato MM/AA';
          case 'cvv': return 'CVV deve ter 3 ou 4 dígitos';
          default: return 'Formato inválido';
        }
      }
    }
    return '';
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.cartService.removeFromCart(productId);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Simular processamento do pedido
      setTimeout(() => {
        // Limpar carrinho
        this.cartService.clearCart();
        
        // Mostrar mensagem de sucesso e redirecionar
        alert('Pedido realizado com sucesso! Obrigado pela compra.');
        this.router.navigate(['/']);
        
        this.isSubmitting = false;
      }, 2000);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price - (price * discountPercentage / 100);
  }
}
