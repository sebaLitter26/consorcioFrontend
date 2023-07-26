import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, share, take, tap } from "rxjs";
import { Building, Order,  } from "../../model";
import { environment } from "src/environments/environment";

const DEFAULT_WEB_FILTERS: any = {
    legajo: null,
    sucursalsolicitante: null,
    fecha: null,
    sector: null,
 
    id: 0
}



@Injectable()
export class CartService {

    constructor(
        private http: HttpClient,
    ) {}


    convertJsonToUrlParams(data:any){
        return Object.keys(data).map(function(k) {
            return (data[k]) ? encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) : ''
        }).join('&');
    }

    /**
     * Obtiene el listado de edificios.
     * @returns un `Observable` con el listado de Edificios
     */
    getBuildings(): Observable<Building[]> {
        return this.http.get<Building[]>(`${environment.apiUrl}/GetBuildings`).pipe(take(1));
        
    }

    getOrdersByPhone(phone: number): Observable<Order[]> {
        return this.http.get<Order[]>(`${environment.apiUrl}/getOrdersByPhone?PHONE=${phone}`).pipe(take(1), share());
        
    }

    createOrder(order: Order): Observable<Order> {
        const updateCreate =(order.id>0) ? 'UpdateOrder' : 'InsertOrder';
        return this.http.post<Order>(`${environment.apiUrl}/${updateCreate}`, order);
        
    }


    /* getOrders(filter: FilterPsico): Observable<Psico[]> {
        return this.http.post<Psico[]>(`${environment.apiUrl}${RRHH}/GetPsico`, filter );
        
    } */

}