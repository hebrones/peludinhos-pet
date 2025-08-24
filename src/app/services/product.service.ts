import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductsResponse } from '../models';
import { PetProductsService } from './pet-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private petProductsService: PetProductsService) { }

  /**
   * Busca todos os produtos
   * @returns Observable com array de produtos
   */
  getAllProducts(): Observable<IProduct[]> {
    return this.petProductsService.getAllProducts();
  }

  /**
   * Busca um produto específico por ID
   * @param id - ID do produto
   * @returns Observable com o produto encontrado
   */
  getProductById(id: number): Observable<IProduct | undefined> {
    return this.petProductsService.getProductById(id);
  }

  /**
   * Busca produtos por categoria
   * @param category - Nome da categoria
   * @returns Observable com array de produtos da categoria
   */
  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.petProductsService.getProductsByCategory(category);
  }

  /**
   * Busca produtos por termo de pesquisa
   * @param query - Termo de pesquisa
   * @returns Observable com array de produtos encontrados
   */
  searchProducts(query: string): Observable<IProduct[]> {
    return this.petProductsService.searchProducts(query);
  }

  /**
   * Busca todas as categorias disponíveis
   * @returns Observable com array de categorias
   */
  getCategories(): Observable<string[]> {
    return this.petProductsService.getCategories();
  }
}