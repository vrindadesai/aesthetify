import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../products';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //extract the productId from the route parameters
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute =
      Number(routeParams.get('productId'));

    //find corresponding product in the products array
    this.product = products.find(product => product.id === productIdFromRoute);
  }


}
