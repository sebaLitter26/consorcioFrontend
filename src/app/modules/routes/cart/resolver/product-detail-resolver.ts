import { Injectable, ViewContainerRef } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Order } from "../../model";
import { CartService } from "../services/cart.service";

/**
 * Es un resolver para precargar los Pedidos, se utiliza en el Operations module
 */
@Injectable()
export class ProductDetailResolver {

    constructor(
        private cartService: CartService,
        public router: Router,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> | null {

        /* if(Object.keys(route.queryParams).length === 0) 
            this.router.navigate(['recursos/carga-psicotecnico']); */
        console.log(route.data);
        
        return (Object.keys(route.queryParams).length === 0) ? null : this.cartService.getOrdersByPhone(route.queryParams.order.phone);
    }
}