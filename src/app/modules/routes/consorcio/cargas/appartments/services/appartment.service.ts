
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Apollo } from 'apollo-angular';
import { APPARTMENT, APPARTMENTS, BUILDING, CREATE_APPARTMENT, DELETE_APPARTMENT, UPDATE_APPARTMENT } from './appartment.graphql';
import { Appartment, Building, BuildingListFilters, CreateAppartmentPayload } from "..";
import { BUILDINGS } from "../../building/services/building.graphql";


const DEFAULT_BUILDING_FILTERS: BuildingListFilters = {
    buildingId: null,
}

@Injectable()      
export class AppartmentService {
    
    constructor(
        public apollo: Apollo,
        //private gdmService: GdmService,
        //private ipService: IpService
    ) {}


    /**
     * Obtiene el listado de departamentos
     * @returns un Observable con el listado de departamentos 
     */
    getBuildings(): Observable<Building[]>{
        return this.apollo.watchQuery({
            query: BUILDINGS,
            //variables: filters,
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => result.data.buildings));
    
        //return this.http.post<Building[]>(`${environment.apiUrl}/getbuildings`, filters);
    }

    /**
     * Obtiene el listado de departamentos
     * @returns un Observable con el listado de departamentos 
     */
    getAppartments(filters: BuildingListFilters = DEFAULT_BUILDING_FILTERS): Observable<Building>{
        return this.apollo.watchQuery({
            query: BUILDING,
            variables: {id: filters.buildingId},
            fetchPolicy: 'network-only'
        }).valueChanges.pipe(map((result: any) => result.data.building));
    }

    /**
     * Crea un building nuevo 
     * @return un observable con el resultado de la peticion
     */
    createAppartment(createAppartmentPayload: CreateAppartmentPayload): Observable<Appartment>{
        console.log(createAppartmentPayload);
        return this.apollo.mutate({
            mutation: CREATE_APPARTMENT,
            variables: {input: createAppartmentPayload},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.Appartment;
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
    updateAppartment(updateAppartmentPayload: CreateAppartmentPayload): Observable<Appartment>{

        return this.apollo.mutate({
            mutation: UPDATE_APPARTMENT,
            variables: {input: updateAppartmentPayload},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.updateBuilding;
        }));

    }

    /**
     * Envia el id de un edificio para que se elimine
     * @return un observable con el edificio eliminado
     */
    deleteAppartment(AppartmentId: string): Observable<Appartment> {
        /* const payload: IDAppartmentPayload = {
            id: AppartmentId
        } */

        return this.apollo.mutate({
            mutation: DELETE_APPARTMENT,
            variables: {id: AppartmentId},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.Appartment;
        }));
    
    }

    /**
     * Obtiene el detalle de un building
     * @return un observable con el detalle de un building
     */
    
    getAppartmentDetails(appartmentId: string): Observable<Appartment> {
        /* const payload: IDappartmentPayload = {
            id: appartmentId
        } */

        return this.apollo.mutate({
            mutation: APPARTMENT,
            variables: {id: appartmentId},
            fetchPolicy: 'network-only'
        }).pipe(map((result: any) => {  
            return result.data.appartment;
        }));
    
    }
} 