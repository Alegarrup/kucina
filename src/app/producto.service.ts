import { Injectable } from '@angular/core';
import { Product } from './catalogo/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrlproductos = 'http://localhost:3000/api/productos';

  items: Product[] = []

  addToCart(product: Product): void {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlproductos);
  }

  filterProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/productosFiltrados/${category}`);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((total, product) => total + product.precio, 0);
  }

  constructor(private http: HttpClient) { }
}
