import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { switchMap } from "rxjs/operators";
import { IpService } from "src/app/services/ip.service";
import { PluUtils } from "src/app/utils/plu.utils";
import { environment } from "src/environments/environment";
import { CancelBuildingPayload, Building, BuildingDetail, BuildingListFilters, BuildingsListProduct, CreateBuildingPayload, InformBuildingPayload } from "..";
import { GdmService } from "../../../gdm/services/gdm.service";
import { RESOURCE_BUILDING } from "../../model";
import { BuildingType } from "../model";

const DEFAULT_BUILDING_FILTERS: BuildingListFilters = {
    tipoConteo: [],
    fechaDesde: null,
    fechaHasta: null,
    estado: [],
    idConteo: null,
    plu: null,
    usuario: null,
}

@Injectable()      
export class BuildingService {
    
    constructor(
        private http: HttpClient, 
        //private gdmService: GdmService,
        private ipService: IpService
    ) {}

    /**
     * Obtiene el listado de conteos
     * @returns un Observable con el listado de conteos 
     */
    getBuildings(filters: BuildingListFilters = DEFAULT_BUILDING_FILTERS): Observable<Building[]>{
        return this.http.post<Building[]>(`${environment.apiUrl}${RESOURCE_BUILDING}/getConteos`, filters);
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
     * Crea un conteo nuevo 
     * @return un observable con el resultado de la peticion
     */
    createBuilding(createBuildingPayload: CreateBuildingPayload): Observable<any>{
        return this.ipService.getIP().pipe(
            //tap(ip => createBuildingPayload.hostname = ip),
            switchMap(() => this.http.post(`${environment.apiUrl}${RESOURCE_BUILDING}/CrearConteo`, createBuildingPayload))
        );
    }
    
    /**
     * Envia el id de un conteo para que se le cambie el estado a informado
     * @return un observable con el resultado de la peticion
     */
    informBuilding(BuildingId: number): Observable<any>{
        const payload: InformBuildingPayload = {
            id_conteo: BuildingId,
            hostname: "",
        }
        return this.ipService.getIP().pipe(
            //tap(ip => payload.hostname = ip),
            switchMap(ip => this.http.put(`${environment.apiUrl}${RESOURCE_BUILDING}/InformarConteo`, payload))
        );
    }

    /**
     * Envia el id de un conteo para que se le cambie el estado a cancelado
     * @return un observable con el resultado de la peticion
     */
    cancelBuilding(BuildingId: number): Observable<any> {
        const payload: CancelBuildingPayload = {
            id_conteo: BuildingId,
            hostname: "",
        }
        return this.ipService.getIP().pipe(
            tap((ip: string) => payload.hostname = ip),
            switchMap((ip: string) => this.http.put(`${environment.apiUrl}${RESOURCE_BUILDING}/CancelarConteo`, payload))
        );
    }

    /**
     * Obtiene el detalle de un conteo
     * @return un observable con el detalle de un conteo
     */
    getBuildingDetails(BuildingId: number): Observable<BuildingDetail> {
        return this.http.get<BuildingDetail>(`${environment.apiUrl}${RESOURCE_BUILDING}/getDetalleConteo?id_conteo=${BuildingId}`).pipe(
            tap(BuildingDetail => {
                if (BuildingDetail.conteo.plu && BuildingDetail.conteo.id_tipo_conteo === BuildingType.UN_PLU) {
                    BuildingDetail.conteo.producto = this.getPluDetails(BuildingDetail.conteo.plu);
                }
            }), 
        );
    }
} 