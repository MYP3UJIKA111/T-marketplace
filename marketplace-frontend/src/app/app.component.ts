import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute: string = '/';
  cartItemsCount: number = 3;

  products: Product[] = [
    {
      id: 1,
      title: 'Сертификат Ozon 5000 ₽',
      description: 'На любую покупку в Ozon',
      price: 4750,
      originalPrice: 5000,
      discount: '-5%',
      image: 'https://via.placeholder.com/120/FFD700/000000?text=OZON'
    },
    {
      id: 2,
      title: 'Яндекс.Еда — 1000 ₽',
      description: 'Промокод на доставку еды',
      price: 900,
      image: 'https://via.placeholder.com/120/FF6600/FFFFFF?text=Я.Еда'
    }
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  addToCart(product: Product): void {
    this.cartItemsCount++;
    console.log('Товар добавлен в корзину:', product);
  }

  // Метод для тестирования
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}