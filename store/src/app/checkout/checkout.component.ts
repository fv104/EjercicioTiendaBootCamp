import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { Store } from '../interfaces/store';
import { DataService } from '../services/data.service';
import { ProductoService } from '../services/producto.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  model = {
    name: '',
    store: '',
    shippingAdress: '',
    city: ''
  }
  isDelivery: boolean = true
  stores: Store[] = []
  cart: Product[] = []
  constructor(private dataService: DataService,private productService : ProductoService,private router : Router,
    private shoppingCartService : ShoppingCartService) {
      this.checkIfCartIsEmpty()
     }

  ngOnInit(): void {
    this.getStores()
    this.getDataCart()
    this.prepareDetails()
    
  }
  private getStores(): void {
    this.dataService.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      ).subscribe()



  }

  onPickupDelivery(value: boolean): void {
    this.isDelivery = value
  }
  onSubmit({ value: formData }: NgForm): void {
    // console.log('Guardar', formData)

    const data: Order = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery
    }

    this.dataService.saveOrder(data)
      .pipe(
        tap(res => console.log("Order -> ", res)),
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetails()
          return this.dataService.saveDetailsOrder({details,orderId})

        }),
        //Necesitamos el modulo Router por lo cual hay que inyectarlo en el constructor
        tap(() => this.router.navigate(['/thank-you-page'])),
        delay(5000),
        tap(() =>  this.shoppingCartService.resetCart())

      ).subscribe()
  }
  private getCurrentDate(): string {
    return new Date().toLocaleDateString()
  }
  private prepareDetails(): Details[] {
    const details: Details[] = []
    
    this.cart.forEach((product : Product) => {
      const {id : productId,name : productName,qty : quantity,stock} = product
      const updateStock = (stock - quantity)

      //Actualizar el stock a partir de un metodo updateStock proporcionado por el servicio ProductService
      this.productService.updateStock(productId,updateStock)
      .pipe(
        tap(() => details.push({productId,productName,quantity}))
      )
      .subscribe()

    })

    return details
  }
  private getDataCart() :  void{
    this.shoppingCartService.cartAction$
    .pipe(
      tap((products : Product[])=> this.cart = products)
    ).subscribe()
  }
  private checkIfCartIsEmpty() : void{

    this.shoppingCartService.cartAction$
    .pipe(
      tap((products : Product[])=>{
        if(Array.isArray(products) && !products.length){
          this.router.navigate([`/products`])
        }
      })
    )
  }
}
