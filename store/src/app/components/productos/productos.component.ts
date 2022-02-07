import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductoService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(
        tap(products => this.products = products)
      )
      .subscribe()
  }
  addToCart(product: Product): void {
    console.log("Add to cart", product)
    this.shoppingCartService.updateCart(product)
  }
}
