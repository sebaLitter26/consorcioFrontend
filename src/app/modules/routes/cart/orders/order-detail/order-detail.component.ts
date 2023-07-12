import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../../../model';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailComponent{
  
    data: Order | null = null;
    loading: boolean = false;

    constructor(
        public router: Router,
    ) {}

    findOrders(){
        this.router.navigate(['/cart/product-list'], {queryParams: this.data, skipLocationChange: true} );
       // history.pushState({psicotecnico : this.data}, "", "/recursos/carga-psicotecnico");
    }

}


