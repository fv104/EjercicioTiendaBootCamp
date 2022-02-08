import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() product! : Product
  @Output() addToCart = new EventEmitter<Product>()

  constructor() { }

  ngOnInit(): void {
  }
  onClick() : void{
    console.log("click")

    //Emitir el evento personalizado
    this.addToCart.emit(this.product)
  }
  
}
