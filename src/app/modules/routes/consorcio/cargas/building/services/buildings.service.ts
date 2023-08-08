
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Building, BuildingDetail, BuildingListFilters, BuildingsListProduct, CreateBuildingPayload, IDBuildingPayload, UpdateBuildingPayload } from "..";


import { Apollo } from 'apollo-angular';
import { BUILDING, BUILDINGS, CREATE_BUILDING, DELETE_BUILDING, UPDATE_BUILDING } from './building.graphql';


const DEFAULT_BUILDING_FILTERS: BuildingListFilters = {
    address: null,
    location: null,
    floors: null
}

@Injectable()      
export class BuildingService {
    
    constructor(
        public apollo: Apollo,
        //private gdmService: GdmService,
        //private ipService: IpService
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
        }).valueChanges.pipe(map((result: any) => result.data.buildings));
    
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
        console.log(createBuildingPayload);
        return this.apollo.mutate({
            mutation: CREATE_BUILDING,
            variables: {input: createBuildingPayload},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
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
    updateBuilding(updateBuildingPayload: UpdateBuildingPayload): Observable<Building>{

        return this.apollo.mutate({
            mutation: UPDATE_BUILDING,
            variables: {input: updateBuildingPayload},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.updateBuilding;
        }));

    }

    /**
     * Envia el id de un edificio para que se elimine
     * @return un observable con el edificio eliminado
     */
    deleteBuilding(buildingId: string): Observable<Building> {
        /* const payload: IDBuildingPayload = {
            id: buildingId
        } */

        return this.apollo.mutate({
            mutation: DELETE_BUILDING,
            variables: {id: buildingId},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.building;
        }));
    
    }

    /**
     * Obtiene el detalle de un building
     * @return un observable con el detalle de un building
     */
    
    getBuildingDetails(buildingId: string): Observable<BuildingDetail> {
        /* const payload: IDBuildingPayload = {
            id: buildingId
        } */

        return this.apollo.mutate({
            mutation: BUILDING,
            variables: {id: buildingId},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.building;
        }));
    
    }
} 