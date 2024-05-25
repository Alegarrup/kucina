import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Product } from '../catalogo/Product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {


  items: Product[] = [];

  precioTotal: number = 0;

  constructor(private productoServicio: ProductoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.updateCart();
  }

  getItems(): void {
    this.items = this.productoServicio.getItems();
  }


  clearCart(): void {
    this.productoServicio.clearCart();
    this.updateCart();
  }

  private updateCart(): void {
    this.items = this.productoServicio.getItems();
    this.precioTotal = this.productoServicio.getTotalPrice();
  }


  finalizarCompra() {
    const email = 'tfcalegarrup@hotmail.com'; // Reemplaza con el correo al que quieres enviar
    this.http.post('http://localhost:3000/api/finalizar-compra', {
      email,
      products: this.items
    }).subscribe(response => {
      alert('Compra finalizada y correo enviado con éxito.');
    }, error => {
      console.error('Error al finalizar la compra:', error);
      alert('Error al finalizar la compra.');
    });
  }
}
