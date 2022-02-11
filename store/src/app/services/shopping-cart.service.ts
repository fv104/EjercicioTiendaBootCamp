import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products : Product[] = []
  constructor() { }
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
    const total = this.products.reduce((acumulador,productoActual) => acumulador += (productoActual.price * productoActual.qty),0)

    //Notificar al observable
    this.totalSubject.next(total)

  }

  //Para la cantidad de productos que el usuario ha añadido al carrito
  private quantityProducts(): void{
    //Para que en el detalle no salga el mismo producto repetido sino agrupado
    //Comentamos lo que habiamos implementado inicialmente
    // const quantity = this.products.length

    const quantity = this.products.reduce((acc, prod) => acc += prod.qty,0)
    this.quantitySubject.next(quantity)
  }
  //Para añadir productos al carrito
  private addToCart(product: Product):void{
    // this.products.push(product)

    //Ahora comprobamos si el producto ya esta en el carrito de la compra y solo aumentamos la cantidad(qty)
    const isProductInCart  = this.products.find(({id}) => id == product.id)

    if(isProductInCart){
      isProductInCart.qty += 1
    }else{

      //Utilizando el spread Operator (...)
      this.products.push({...product,qty : 1})
    }
    this.cartSubject.next(this.products)
  }

  //Metodo publico para actualizar el carrito de la compra
  updateCart(product: Product) : void{
    this.addToCart(product)
    this.calcTotal()
    this.quantityProducts()
  }
  resetCart() : void{
    this.cartSubject.next([])
    this.totalSubject.next(0)
    this.quantitySubject.next(0)
    this.products = []
  }
  
}
