import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, share, take, tap } from "rxjs";
import { FormPsico, Curso, Sector, Nomina, Sucursal, Empleado, FilterPsico, Psico } from "../models/order.model";
import { environment } from "src/environments/environment";
import { GRAL, RRHH } from "../../model";

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
     * Obtiene el listado de Sectores para .
     * @returns un `Observable` con el listado de Sectores
     */
    getSectores(): Observable<Sector[]> {
        return this.http.get<any[]>(`${environment.apiUrl}${RRHH}/GetSectores`).pipe(take(1));
        
    }

    getNombreCurso(): Observable<Curso[]> {
        return this.http.get<any[]>(`${environment.apiUrl}${RRHH}/GetNombreCurso`).pipe(take(1));
    }

    getSucursales(): Observable<Sucursal[]> {
        return this.http.get<Sucursal[]>(`${environment.apiUrl}${GRAL}/GetSucursales`).pipe(take(1));
        
    }

    getEmpleadoByLegajo(legajo: number): Observable<Empleado> {
        return this.http.get<Empleado>(`${environment.apiUrl}${GRAL}/GetEmpleadoByLegajo?LEGAJO=${legajo}`).pipe(take(1), share());
        
    }

    insertPsico(profile: FormPsico): Observable<Psico> {
        const updateCreate =(profile.id>0) ? 'UpdatePsico' : 'InsertPsico';
        return this.http.post<Psico>(`${environment.apiUrl}${RRHH}/${updateCreate}`, profile);
        
    }


    getPsico(filter: FilterPsico): Observable<Psico[]> {
        return this.http.post<Psico[]>(`${environment.apiUrl}${RRHH}/GetPsico`, filter );
        
    }

}