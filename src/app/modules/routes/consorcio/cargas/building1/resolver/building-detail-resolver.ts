import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { BuildingDetail } from "..";
import { BuildingService } from "../services/building.service";

/**
 * Es un resolver para precargar los conteos, se utiliza en el Counts module
 */
@Injectable()
export class BuildingDetailResolver {

    constructor(
        private buildingService: BuildingService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BuildingDetail> {
        return this.buildingService.getbuildingDetails(+route.queryParams.id);
    }
}