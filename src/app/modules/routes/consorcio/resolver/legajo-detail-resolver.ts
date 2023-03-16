import { Injectable, ViewContainerRef } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Building } from "../models/inmueble.model";
import { RRHHControlService } from "../services/rrhh-control.service";

/**
 * Es un resolver para precargar los Pedidos, se utiliza en el Operations module
 */
@Injectable()
export class LegajoDetailResolver implements Resolve<Building[] | null> {

    constructor(
        private recursosService: RRHHControlService,
        public router: Router,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Building[]> | null {

        /* if(Object.keys(route.queryParams).length === 0) 
            this.router.navigate(['recursos/carga-psicotecnico']); */
        console.log(route.data);
        
        return (Object.keys(route.queryParams).length === 0) ? null : this.recursosService.getBuildings();  //route.queryParams
    }
}