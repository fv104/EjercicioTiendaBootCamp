import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  cart$ = this.shoppingCartService.cartAction$
  total$ = this.shoppingCartService.totalAction$
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
