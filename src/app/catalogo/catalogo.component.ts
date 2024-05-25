import { Component, Input } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ActivatedRoute } from '@angular/router';
import { Product, products } from './Product';
import { Categoria, categoria } from './Categoria';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})

export class CatalogoComponent {

  categorias: Categoria[] = [];

  products: Product[] = [];

  mostrarBotones = true;

  productosFiltrados : Product[] | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private productoServicio: ProductoService
  ) { }

  ngOnInit(): void {
    this.productoServicio.getProducts().subscribe(products => {
      console.log(products)
      this.products = products;
    });


  }
  addToCart(product: Product): void {
    this.productoServicio.addToCart(product);
    window.alert("Producto añadido al carrito")
  }

  filterProductsByCategory(category: string): void {
    this.productoServicio.filterProductsByCategory(category).subscribe(
      (products: Product[]) => {
        this.productosFiltrados = products;
      },
      (error) => {
        console.error('Error al obtener productos filtrados por categoría:', error);
      }
    );
    this.mostrarBotones = false;
  }

  atras(): void{
    this.mostrarBotones =true;
  }


}
