import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, share, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { User, FormUser } from "..";
import { ACCOUNT } from "../../model";

const DEFAULT_WEB_FILTERS: FormUser = {
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
}



@Injectable()
export class UserService {

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
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}${ACCOUNT}/GetUsuarios`).pipe(take(1));
        
    }


   /*  getEmpleadoByLegajo(legajo: number): Observable<Empleado> {
        return this.http.get<Empleado>(`${environment.apiUrl}${GRAL}/GetEmpleadoByLegajo?LEGAJO=${legajo}`).pipe(take(1), share());
        
    } 

    insertPsico(profile: FormPsico): Observable<Psico> {
        return this.http.post<Psico>(`${environment.apiUrl}${RRHH}/InsertPsico`, profile);
        
    }
*/


}