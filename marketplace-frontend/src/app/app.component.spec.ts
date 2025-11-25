import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Главные модули Taiga UI, которые используются в шаблоне
import {
  TuiRootModule,
  TuiButtonModule,
  TuiSvgModule,
} from '@taiga-ui/core';

import {
  TuiIslandModule,
  TuiBadgeModule,
} from '@taiga-ui/kit';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,   // обязательно для Taiga UI
        TuiRootModule,
        TuiButtonModule,
        TuiSvgModule,
        TuiIslandModule,
        TuiBadgeModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header with "Бонусы Маркетплейс"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const headerText = compiled.querySelector('header')?.textContent;
    expect(headerText).toContain('Бонусы');
    expect(headerText).toContain('Маркетплейс');
  });

  it('should render the greeting "Привет!"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const greeting = compiled.querySelector('.greeting')?.textContent;
    expect(greeting).toContain('Привет!');
  });

  it('should render at least one product card with price', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const priceElements = compiled.querySelectorAll('.product__price');
    expect(priceElements.length).toBeGreaterThan(0);
    expect(priceElements[0].textContent).toContain('4 750');
  });

  it('should have working bottom navigation with 4 items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const navItems = compiled.querySelectorAll('.bottom-nav .nav-item');
    expect(navItems.length).toBe(4);

    const labels = Array.from(navItems).map(item => item.textContent?.trim());
    expect(labels).toContain('Главная');
    expect(labels).toContain('Каталог');
    expect(labels).toContain('Корзина');
    expect(labels).toContain('Заказы');
  });

  it('should display correct balance amount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const balanceAmount = compiled.querySelector('.balance__amount')?.textContent;
    expect(balanceAmount).toContain('12 450');
  });

  it('should display cart items count', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const cartBadge = compiled.querySelector('.cart-badge');
    expect(cartBadge?.textContent).toContain('3');
  });

  it('should have product with discount badge', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const discountBadge = compiled.querySelector('tui-badge[status="warning"]');
    expect(discountBadge).toBeTruthy();
    expect(discountBadge?.textContent).toContain('-5%');
  });

  it('should add product to cart when button clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const initialCartCount = app.cartItemsCount;
    
    // Находим первую кнопку "В корзину" и кликаем
    const buyButton = fixture.nativeElement.querySelector('.product__buy');
    buyButton.click();
    
    fixture.detectChanges();
    
    expect(app.cartItemsCount).toBe(initialCartCount + 1);
  });
});