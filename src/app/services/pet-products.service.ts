import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PetProductsService {
  private petProducts: IProduct[] = [
    {
      id: 1,
      title: 'Ração Premium para Cães Adultos',
      description: 'Ração super premium com ingredientes naturais, rica em proteínas e vitaminas essenciais para a saúde do seu melhor amigo! 🐕',
      price: 89.90,
      discountPercentage: 15,
      rating: 4.8,
      stock: 25,
      brand: 'PetNutri',
      category: 'Alimentação',
      thumbnail: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop'
      ],
      tags: ['ração', 'premium', 'cães', 'adultos', 'natural'],
      sku: 'RPC-001',
      weight: 15,
      dimensions: {
        width: 30,
        height: 45,
        depth: 15
      },
      warrantyInformation: 'Garantia de qualidade de 6 meses',
      shippingInformation: 'Frete grátis para compras acima de R$ 99',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Meu cachorro adorou! Excelente qualidade.',
          date: '2024-01-15',
          reviewerName: 'Maria Silva',
          reviewerEmail: 'maria@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        barcode: '7891234567890',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 2,
      title: 'Shampoo Hipoalergênico para Pets',
      description: 'Shampoo especial para peles sensíveis, deixa o pelo macio e brilhante. Perfeito para banhos relaxantes! 🛁',
      price: 24.90,
      discountPercentage: 10,
      rating: 4.6,
      stock: 40,
      brand: 'CleanPet',
      category: 'Higiene',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/985906-368-368/CLORESTEN-SHAMPOO-500ML.jpg?v=638122443330930000',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/985906-368-368/CLORESTEN-SHAMPOO-500ML.jpg?v=638122443330930000'
      ],
      tags: ['shampoo', 'hipoalergênico', 'pets', 'higiene', 'pele sensível'],
      sku: 'SHP-002',
      weight: 0.5,
      dimensions: {
        width: 8,
        height: 20,
        depth: 8
      },
      warrantyInformation: 'Garantia de qualidade de 12 meses',
      shippingInformation: 'Entrega em 3-5 dias úteis',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Ótimo produto, meu gato não teve alergia.',
          date: '2024-01-10',
          reviewerName: 'João Santos',
          reviewerEmail: 'joao@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
        barcode: '7891234567891',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 3,
      title: 'Coleira Ajustável com Guia',
      description: 'Coleira resistente e confortável com guia retrátil. Ideal para passeios seguros e divertidos! 🚶‍♂️🐕',
      price: 45.50,
      discountPercentage: 20,
      rating: 4.7,
      stock: 18,
      brand: 'WalkSafe',
      category: 'Acessórios',
      thumbnail: 'https://images.petz.com.br/fotos/1676486629209.jpg',
      images: [
        'https://images.petz.com.br/fotos/1676486629209.jpg'
      ],
      tags: ['coleira', 'guia', 'passeio', 'acessórios', 'segurança'],
      sku: 'COL-003',
      weight: 0.3,
      dimensions: {
        width: 2,
        height: 120,
        depth: 2
      },
      warrantyInformation: 'Garantia de qualidade de 12 meses',
      shippingInformation: 'Entrega em 2-4 dias úteis',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Muito resistente e confortável para o meu cão.',
          date: '2024-01-12',
          reviewerName: 'Ana Costa',
          reviewerEmail: 'ana@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-12T00:00:00Z',
        barcode: '7891234567892',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 4,
      title: 'Brinquedo Mordedor Resistente',
      description: 'Brinquedo super resistente para cães que adoram morder. Feito com material atóxico e durável! 🦴',
      price: 19.90,
      discountPercentage: 8,
      rating: 4.5,
      stock: 35,
      brand: 'PlayDog',
      category: 'Brinquedos',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/1044149-368-368/Brinquedo-Cenoura-Nylon-Buddy-Toys-frente.png?v=638754908240700000',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/1044149-368-368/Brinquedo-Cenoura-Nylon-Buddy-Toys-frente.png?v=638754908240700000'
      ],
      tags: ['brinquedo', 'mordedor', 'resistente', 'dental', 'cães'],
      sku: 'BRI-004',
      weight: 0.2,
      dimensions: {
        width: 10,
        height: 15,
        depth: 5
      },
      warrantyInformation: 'Garantia de qualidade de 6 meses',
      shippingInformation: 'Entrega em 2-4 dias úteis',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 4,
          comment: 'Meu cão adora! Muito resistente.',
          date: '2024-01-08',
          reviewerName: 'Carlos Lima',
          reviewerEmail: 'carlos@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-08T00:00:00Z',
        barcode: '7891234567893',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 5,
      title: 'Ração para Gatos Filhotes',
      description: 'Ração especialmente formulada para gatinhos em crescimento. Rica em DHA e nutrientes essenciais! 🐱',
      price: 65.90,
      discountPercentage: 12,
      rating: 4.9,
      stock: 22,
      brand: 'FelineNutri',
      category: 'Alimentação',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/1037578-368-368/Filhote-Frango-Arroz-frente.jpg?v=638127726940170000',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/1037578-368-368/Filhote-Frango-Arroz-frente.jpg?v=638127726940170000'
      ],
      tags: ['ração', 'gatos', 'filhotes', 'DHA', 'crescimento'],
      sku: 'RGF-005',
      weight: 3,
      dimensions: {
        width: 20,
        height: 30,
        depth: 10
      },
      warrantyInformation: 'Garantia de qualidade de 6 meses',
      shippingInformation: 'Frete grátis para compras acima de R$ 99',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Meus gatinhos adoraram! Crescimento saudável.',
          date: '2024-01-14',
          reviewerName: 'Lucia Fernandes',
          reviewerEmail: 'lucia@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-14T00:00:00Z',
        barcode: '7891234567894',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 6,
      title: 'Arranhador para Gatos',
      description: 'Arranhador em sisal natural, perfeito para manter as unhas saudáveis e proteger seus móveis! 😸',
      price: 78.50,
      discountPercentage: 18,
      rating: 4.4,
      stock: 15,
      brand: 'ScratchPost',
      category: 'Acessórios',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/1064258-368-368/Arranhador-Cacto.png?v=638681590772970000',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/1064258-368-368/Arranhador-Cacto.png?v=638681590772970000'
      ],
      tags: ['arranhador', 'gatos', 'sisal', 'unhas', 'móveis'],
      sku: 'ARR-006',
      weight: 5,
      dimensions: {
        width: 40,
        height: 60,
        depth: 40
      },
      warrantyInformation: 'Garantia de qualidade de 12 meses',
      shippingInformation: 'Entrega em 5-7 dias úteis',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 4,
          comment: 'Meus gatos adoraram! Pararam de arranhar o sofá.',
          date: '2024-01-11',
          reviewerName: 'Pedro Silva',
          reviewerEmail: 'pedro@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-11T00:00:00Z',
        barcode: '7891234567895',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 7,
      title: 'Bolinha Interativa com Som',
      description: 'Brinquedo interativo que emite sons divertidos! Estimula a atividade física e mental do seu pet. 🎾',
      price: 32.90,
      discountPercentage: 8,
      rating: 4.3,
      stock: 28,
      brand: 'FunToys',
      category: 'Brinquedos',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/1066500-368-368/Brinquedo-Bolinha-Flicks-Caracteristicas.png?v=638715103011500000',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/1066500-368-368/Brinquedo-Bolinha-Flicks-Caracteristicas.png?v=638715103011500000'
      ],
      tags: ['bolinha', 'interativa', 'som', 'estimulação', 'atividade'],
      sku: 'BOL-007',
      weight: 0.15,
      dimensions: {
        width: 8,
        height: 8,
        depth: 8
      },
      warrantyInformation: 'Garantia de qualidade de 6 meses',
      shippingInformation: 'Entrega em 2-4 dias úteis',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 4,
          comment: 'Meu cão se diverte muito com os sons!',
          date: '2024-01-09',
          reviewerName: 'Fernanda Oliveira',
          reviewerEmail: 'fernanda@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-09T00:00:00Z',
        barcode: '7891234567896',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 8,
      title: 'Cama Ortopédica para Pets',
      description: 'Cama super confortável com espuma ortopédica. Ideal para pets idosos ou com problemas articulares! 💤',
      price: 129.90,
      discountPercentage: 20,
      rating: 4.8,
      stock: 12,
      brand: 'ComfortPet',
      category: 'Acessórios',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/1067672-368-368/CAMA-OSSINHO-PRETO-FLICKS-carecteristicas.png.png?v=638745290781270000',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/1067672-368-368/CAMA-OSSINHO-PRETO-FLICKS-carecteristicas.png.png?v=638745290781270000'
      ],
      tags: ['cama', 'ortopédica', 'conforto', 'idosos', 'articulações'],
      sku: 'CAM-008',
      weight: 2,
      dimensions: {
        width: 60,
        height: 15,
        depth: 80
      },
      warrantyInformation: 'Garantia de qualidade de 24 meses',
      shippingInformation: 'Frete grátis para compras acima de R$ 99',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Perfeita para meu cão idoso! Muito confortável.',
          date: '2024-01-13',
          reviewerName: 'Roberto Santos',
          reviewerEmail: 'roberto@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-13T00:00:00Z',
        barcode: '7891234567897',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 9,
      title: 'Kit Higiene Dental para Cães',
      description: 'Kit completo com escova e pasta dental especial para cães. Mantenha os dentinhos sempre limpos! 🦷',
      price: 38.90,
      discountPercentage: 15,
      rating: 4.6,
      stock: 30,
      brand: 'DentalCare',
      category: 'Higiene',
      thumbnail: 'https://cobasi.vteximg.com.br/arquivos/ids/941845-368-368',
      images: [
        'https://cobasi.vteximg.com.br/arquivos/ids/941845-368-368'
      ],
      tags: ['kit', 'higiene', 'dental', 'escova', 'pasta'],
      sku: 'KIT-009',
      weight: 0.3,
      dimensions: {
        width: 15,
        height: 20,
        depth: 5
      },
      warrantyInformation: 'Garantia de qualidade de 12 meses',
      shippingInformation: 'Entrega em 2-4 dias úteis',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Excelente kit! Meu cão tem hálito fresco agora.',
          date: '2024-01-07',
          reviewerName: 'Mariana Costa',
          reviewerEmail: 'mariana@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-07T00:00:00Z',
        barcode: '7891234567898',
        qrCode: 'data:image/png;base64,qrcode'
      }
    },
    {
      id: 10,
      title: 'Comedouro Automático Inteligente',
      description: 'Comedouro com timer programável e controle de porções. Tecnologia a serviço do seu pet! 🤖',
      price: 189.90,
      discountPercentage: 30,
      rating: 4.7,
      stock: 8,
      brand: 'SmartPet',
      category: 'Acessórios',
      thumbnail: 'https://m.media-amazon.com/images/I/51ansqiUO5L.__AC_SX300_SY300_QL70_ML2_.jpg',
      images: [
        'https://m.media-amazon.com/images/I/51ansqiUO5L.__AC_SX300_SY300_QL70_ML2_.jpg'
      ],
      tags: ['comedouro', 'automático', 'inteligente', 'timer', 'porções'],
      sku: 'COM-010',
      weight: 1.5,
      dimensions: {
        width: 25,
        height: 20,
        depth: 35
      },
      warrantyInformation: 'Garantia de qualidade de 24 meses',
      shippingInformation: 'Frete grátis para compras acima de R$ 99',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Revolucionou a alimentação do meu pet! Muito prático.',
          date: '2024-01-06',
          reviewerName: 'Alexandre Pereira',
          reviewerEmail: 'alexandre@email.com'
        }
      ],
      returnPolicy: 'Devolução em até 30 dias',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-06T00:00:00Z',
        barcode: '7891234567899',
        qrCode: 'data:image/png;base64,qrcode'
      }
    }
  ];

  /**
   * Retorna todos os produtos para pets
   */
  getAllProducts(): Observable<IProduct[]> {
    return of(this.petProducts);
  }

  /**
   * Busca produtos por termo
   */
  searchProducts(searchTerm: string): Observable<IProduct[]> {
    if (!searchTerm.trim()) {
      return this.getAllProducts();
    }

    const filteredProducts = this.petProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filteredProducts);
  }

  /**
   * Retorna um produto específico por ID
   */
  getProductById(id: number): Observable<IProduct | undefined> {
    const product = this.petProducts.find(p => p.id === id);
    return of(product);
  }

  /**
   * Retorna produtos por categoria
   */
  getProductsByCategory(category: string): Observable<IProduct[]> {
    const filteredProducts = this.petProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    return of(filteredProducts);
  }

  /**
   * Retorna todas as categorias disponíveis
   */
  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.petProducts.map(p => p.category))];
    return of(categories);
  }
}