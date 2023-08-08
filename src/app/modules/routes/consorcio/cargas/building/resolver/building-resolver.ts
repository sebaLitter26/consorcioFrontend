import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Building } from "..";
import { BuildingService } from "../services/buildings.service";

/**
 * Es un resolver para precargar los conteos, se utiliza en el buildings module
 */
@Injectable()
export class BuildingsResolver{

    constructor(
        private buildingService: BuildingService,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Building[]> {
        return this.buildingService.getBuildings();
    }
}