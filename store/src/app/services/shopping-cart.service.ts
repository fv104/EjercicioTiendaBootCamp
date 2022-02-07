import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products : Product[] = []
  
  private cartSubject = new BehaviorSubject<Product[]>([])
  private totalSubject = new  BehaviorSubject<number>(0)
  private quantitySubject = new BehaviorSubject<number>(0)

  // Para devolver estos observables a la aplicacion para quien los quiera consumir tenemos que crear unos metodos getter que son publicos

  get cartAction$() : Observable<Product[]> {
    return this.cartSubject.asObservable()
  }
  get totalAction$() : Observable<number> {
    return this.totalSubject.asObservable()
  }
  get quantityAction$() : Observable<number>{
    return this.quantitySubject.asObservable()
  }

  //Necesitamos unos metodos privados tambien para calcular el total de la orden que los clientes compran
  private calcTotal() : void{
    const total = this.products.reduce((acumulador,productoActual) => acumulador += productoActual.price,0)

    //Notificar al observable
    this.totalSubject.next(total)

  }

  //Para la cantidad de productos que el usuario ha añadido al carrito
  private quantityProducts(): void{
    const quantity = this.products.length

    this.quantitySubject.next(quantity)
  }
  //Para añadir productos al carrito
  private addToCart(product: Product):void{
    this.products.push(product)
    this.cartSubject.next(this.products)
  }

  //Metodo publico para actualizar el carrito de la compra
  updateCart(product: Product) : void{
    this.addToCart(product)
    this.calcTotal()
    this.quantityProducts()
  }
  constructor() { }
}
