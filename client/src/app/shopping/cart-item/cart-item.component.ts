import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  //@Input book
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    //@TODO:
    //Call remove book from cart from the shopping service
  }

}
