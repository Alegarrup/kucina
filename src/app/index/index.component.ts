import { Component } from '@angular/core';
import { Product, products } from '../catalogo/Product';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  constructor(
    private productoServicio: ProductoService
  ) { }

  products: Product[] = [];


  ngOnInit(): void {
    this.productoServicio.getProducts().subscribe(products => {
      this.products = products;
    });
}

}