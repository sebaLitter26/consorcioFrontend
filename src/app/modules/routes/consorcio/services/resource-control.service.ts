import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable, of, share, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Appartment, Building, Owner, Tenant } from "../../model";
import { User } from "../../user";
import { TenantFilters } from "../cargas/tenant/model";




@Injectable()
export class ResourceService {

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
        const payload = {
            page, limit
        }
        return this.http.post<any[]>(`${environment.apiUrl}buildings`,payload);
        
    }


    /**
     * Obtiene el listado de Departamentos
     * @returns un `Observable` con el listado de Departamentos
     */
    getAppartments(page: number = 1, limit: number = 10): Observable<Appartment[]> {
        const payload = {
            page, limit
        }
        return this.http.post<Appartment[]>(`${environment.apiUrl}appartments`, payload);
        
    }

    /**
     * Obtiene el listado de Usuarios
     * @returns un `Observable` con el listado de Usuarios
     */
    getUsers(page: number = 1, limit: number = 10): Observable<User[]> {
        const payload = {
            page, limit
        }
        return this.http.post<any[]>(`${environment.apiUrl}users`, payload);
        
    }

    /**
     * Obtiene el listado de Inquilinos
     * @returns un `Observable` con el listado de Departamentos
     */
    getTenants(page: number = 1, limit: number = 10): Observable<Tenant[]> {
        const payload = {
            page, limit
        }
        return this.http.post<any[]>(`${environment.apiUrl}tenants`, payload);
        
    }

    /**
     * Obtiene el listado de Inquilinos
     * @returns un `Observable` con el listado de Departamentos
     */
    getOwners(page: number = 1, limit: number = 10): Observable<Owner[]> {
        const payload = {
            page, limit
        }
        return this.http.post<any[]>(`${environment.apiUrl}owners`, payload);
        
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

    insertBuilding(payload: Building): Observable<Building> {
        const updateORcreate = (payload.id.length>10) ? `update` : `create` + `Building`;
        return this.http.post<Building>(`${environment.apiUrl}${updateORcreate}`, payload);
        
    }

    insertAppartment(payload: Appartment): Observable<Appartment> {
        const updateORcreate = (payload.id.length>10) ? `update` : `create` + `Appartment`;
        return this.http.post<Appartment>(`${environment.apiUrl}${updateORcreate}`, payload);
    }

    insertTenant(payload: Tenant): Observable<Tenant> {
        const updateORcreate = (payload.id.length>10) ? `update` : `create` + `Tenant`;
        return this.http.post<Tenant>(`${environment.apiUrl}${updateORcreate}`, payload);
    }

    insertOwner(payload: Owner): Observable<Owner> {
        const updateORcreate = (payload.id.length>10) ? `update` : `create` + `Owner`;
        return this.http.post<Owner>(`${environment.apiUrl}${updateORcreate}`, payload);
    }


    /* getPsico(filter: FilterPsico): Observable<Psico[]> {
        return this.http.post<Psico[]>(`${environment.apiUrl}${RRHH}/GetPsico`, filter );
        
    } */
    
    action(payload: any, action: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}${action}`, payload);
    }

}