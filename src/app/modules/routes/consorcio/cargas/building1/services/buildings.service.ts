import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { IpService } from "src/app/services/ip.service";
import { PluUtils } from "src/app/utils/plu.utils";
import { environment } from "src/environments/environment";
import { CancelBuildingPayload, Building, BuildingDetail, BuildingListFilters, BuildingsListProduct, CreateBuildingPayload, InformBuildingPayload, DeleteBuildingPayload, IDBuildingPayload } from "..";
import { GdmService } from "../../../../../gdm/services/gdm.service";
import { BuildingType } from "../model";

import { Apollo } from 'apollo-angular';
import { BUILDINGS } from './building.graphql';


const DEFAULT_BUILDING_FILTERS: BuildingListFilters = {
    tipo_building: [],
    fechaDesde: null,
    fechaHasta: null,
    estado: [],
    id_building: null,
    plu: null,
    usuario: null,
}

@Injectable()      
export class BuildingService {
    
    constructor(
        private http: HttpClient, 
        public apollo: Apollo,
        //private gdmService: GdmService,
        private ipService: IpService
    ) {}

    /**
     * Obtiene el listado de buildings
     * @returns un Observable con el listado de buildings 
     */
    getBuildings(filters: BuildingListFilters = DEFAULT_BUILDING_FILTERS): Observable<Building[]>{
        return this.apollo.watchQuery({
            query: BUILDINGS,
            variables: filters,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => {  
            return result.data.buildings;
        }));
    
        //return this.http.post<Building[]>(`${environment.apiUrl}/getbuildings`, filters);
    }

    /**
     * Busca la info del plu para mostrar el componente BuildingListProductComponent en la table
     * @param plu El plu a buscar
     * @returns un BuildingListProduct con el plu, la descripcion y el url de la imagen 
     */
     getPluDetails(plu: string): BuildingsListProduct | undefined  {
        let product: BuildingsListProduct | undefined = undefined;
        // Si gdmService no encuentra el plu devuelve un undefined object, no devuelve un error
        /* this.gdmService.getPluInformation(plu).pipe(take(1)).subscribe(pluObject => {
                product = (pluObject !== undefined) ? {plu: plu, descripcion: pluObject.descripcion, imagen: PluUtils.buildPluImageUrl(plu)} : undefined;
        }); */

        return product;
    }

    /**
     * Crea un building nuevo 
     * @return un observable con el resultado de la peticion
     */
    createBuilding(createBuildingPayload: CreateBuildingPayload): Observable<Building>{

        return this.apollo.mutate({
            mutation: BUILDINGS,
            variables: createBuildingPayload,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => {  
            return result.data.building;
        }));
        //return this.http.post(`${environment.apiUrl}/createBuilding`, createBuildingPayload);

        /* return this.ipService.getIP().pipe(
            //tap(ip => createBuildingPayload.hostname = ip),
            switchMap(() => )
        ); */
    }
    
    /**
     * Envia el id de un building para que se le cambie el estado a informado
     * @return un observable con el resultado de la peticion
     */
    informBuilding(BuildingId: number): Observable<any>{
        const payload: InformBuildingPayload = {
            id_building: BuildingId,
            hostname: "",
        }

        return this.http.post(`${environment.apiUrl}/Informarbuilding`, payload);

        /* return this.ipService.getIP().pipe(
            //tap(ip => payload.hostname = ip),
            switchMap(ip => this.http.post(`${environment.apiUrl}/Informarbuilding`, payload))
        ); */
    }

    /**
     * Envia el id de un building para que se le cambie el estado a cancelado
     * @return un observable con el resultado de la peticion
     */
    deleteBuilding(buildingId: string): Observable<any> {
        const payload: IDBuildingPayload = {
            id: buildingId
        }
        return this.http.post(`${environment.apiUrl}/deleteBuilding`, payload);

        /* return this.ipService.getIP().pipe(
            tap((ip: string) => payload.hostname = ip),
            switchMap((ip: string) => this.http.put(`${environment.apiUrl}/deleteBuilding`, payload))
        ); */
    }

    /**
     * Obtiene el detalle de un building
     * @return un observable con el detalle de un building
     */
    getBuildingDetails(buildingId: string): Observable<BuildingDetail> {
        const payload: IDBuildingPayload = {
            id: buildingId
        }
        return this.http.post<BuildingDetail>(`${environment.apiUrl}/building`, payload);
        /*.pipe(
             tap(BuildingDetail => {
                if (BuildingDetail.building.plu && BuildingDetail.building.id_tipo_building === BuildingType.UN_PLU) {
                    BuildingDetail.building.producto = this.getPluDetails(BuildingDetail.building.plu);
                }
            }),
        ); */ 
    }
} 