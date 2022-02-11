import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productsUrl : string = "http://localhost:3000/products"

  constructor(private http:HttpClient) { 
  
  }
  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl)
  }
  updateStock(productId : number, stock : number) : Observable<any>{
    const body = {"stock" : stock}
    return this.http.patch<any>(`${this.productsUrl}/${productId}`,body)
  }
}
