import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable, of, share, take, tap } from "rxjs";
import { Appartment, Building, FormPsico, Owner, Tenant } from "../models/inmueble.model";
import { environment } from "src/environments/environment";
import { GRAL, RRHH } from "../../model";
import { User } from "../../user";

const DEFAULT_WEB_FILTERS: FormPsico = {
    legajo: null,
    sucursalsolicitante: null,
    fecha: null,
    sector: null,
    puestopostulado: null,
    postula: null,
    result: null,
    psicologo: null,
    bateriatests: null,
    tieneveraz: null,
    observaciones: null,
    activo: null,
    apellidonombre: '',
    cargo: '',
    refpsico: false,
    gr_prof: '',
    doc_tipo: '',
    doc_nro: '',
    idcarga: '',
    nombreusuario: '',
    nombreequipo: '',
    tab: '',
    id: 0
}



@Injectable()
export class RRHHControlService {

    constructor(
        private http: HttpClient,
    ) {}


    convertJsonToUrlParams(data:any){
        return Object.keys(data).map(function(k) {
            return (data[k]) ? encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) : ''
        }).join('&');
    }

    /**
     * Obtiene el listado de Edificios.
     * @returns un `Observable` con el listado de Edificios
     */
    getBuildings(page: number = 1, limit: number = 10): Observable<Building[]> {
        return this.http.get<any[]>(`${environment.apiUrl}building?page=${page}&limit=${limit}`).pipe( map((elem: any)=> elem['data']) , take(1));
        
    }


    /**
     * Obtiene el listado de Departamentos
     * @returns un `Observable` con el listado de Departamentos
     */
    getAppartments(page: number = 1, limit: number = 10): Observable<Appartment[]> {
        return this.http.get<any[]>(`${environment.apiUrl}appartment?page=${page}&limit=${limit}`).pipe( map((elem: any)=> elem['data']) , take(1));
        
    }

    /**
     * Obtiene el listado de Usuarios
     * @returns un `Observable` con el listado de Usuarios
     */
    getUsers(page: number = 1, limit: number = 10): Observable<User[]> {
        return this.http.get<any[]>(`${environment.apiUrl}users?page=${page}&limit=${limit}`).pipe( map((elem: any)=> elem['data']) , take(1));
        
    }

    /* getNombreCurso(): Observable<Curso[]> {
        return this.http.get<any[]>(`${environment.apiUrl}${RRHH}/GetNombreCurso`).pipe(take(1));
    }

    getSucursales(): Observable<Sucursal[]> {
        return this.http.get<Sucursal[]>(`${environment.apiUrl}${GRAL}/GetSucursales`).pipe(take(1));
        
    }

    getEmpleadoByLegajo(legajo: number): Observable<Empleado> {
        return this.http.get<Empleado>(`${environment.apiUrl}${GRAL}/GetEmpleadoByLegajo?LEGAJO=${legajo}`).pipe(take(1), share());
        
    } */

    insertBuilding(building: Building): Observable<Building> {
        return (building.id>0) ? this.http.patch<Building>(`${environment.apiUrl}building`, building) : this.http.post<Building>(`${environment.apiUrl}building`, building);
        
    }

    insertAppartment(appartment: Appartment): Observable<Appartment> {
        return (appartment.id>0) ? this.http.patch<Appartment>(`${environment.apiUrl}appartment`, appartment) : this.http.post<Appartment>(`${environment.apiUrl}appartment`, appartment);
        
    }

    insertTenant(tenant: Tenant): Observable<Tenant> {
        return (tenant.id>0) ? this.http.patch<Tenant>(`${environment.apiUrl}tenant`, tenant) : this.http.post<Tenant>(`${environment.apiUrl}tenant`, tenant);
        
    }

    insertOwner(owner: Owner): Observable<Owner> {
        return (owner.id>0) ? this.http.patch<Owner>(`${environment.apiUrl}owner`, owner) : this.http.post<Tenant>(`${environment.apiUrl}tenant`, owner);
        
    }


    /* getPsico(filter: FilterPsico): Observable<Psico[]> {
        return this.http.post<Psico[]>(`${environment.apiUrl}${RRHH}/GetPsico`, filter );
        
    } */

}