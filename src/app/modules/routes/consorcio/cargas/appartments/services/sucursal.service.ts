import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { forkJoin, Observable, of } from "rxjs";
import { tap, take, switchMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CuposUpdatePayload, CupoSeleccionado, CupoSucursal, CupoSelection, UpdateResponse, CuposHistorico, Sucursal } from "..";
import { SnackBarService } from "src/app/services/snackbar.service";
import { ProfileService } from "src/app/modules/main/services/profile.service";

const DEFAULT_CUPOS_FILTERS: any = {
    fechadesde: null,
    fechahasta: null,
    sucursal: null,
}

@Injectable()
export class SucursalService {

    posible_operations: any[] = [];

    constructor(
        private http: HttpClient,
        private profileService: ProfileService, 
        private snackBarService: SnackBarService,
    ) {
        //this.posible_operations = this.profileService.user.operaciones;
    }

    convertJsonToUrlParams(data:any){
        return '?'+Object.keys(data).map(function(k) {
            return (data[k]) ? encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) : ''
        }).join('&');
    }
    
    /**
     * Actualiza el listado de Cupos reservados para un horario específico.
     * @param cuposDisponibilizados listado de Cupos seleccionados de la sucursal
     * @returns un `Observable` con la respuesta del servicio
     */
    updateSucursalesCupos(cuposReservados: CupoSelection[]): Observable<UpdateResponse> {

        /* if(this.profileService.user.usuariont){
            this.snackBarService.open("ERROR: Perfil de usuario incorrecto", "Aceptar", 0, "error-snackbar");
            return null;
        } */
            
        let payload: CuposUpdatePayload[] = [];
        
        cuposReservados.forEach(dispo => {
            payload.push({
                idhecf: dispo.idhorariosentregacuposfecha,
                //ip: this.profileService.user.usuariont?? '',
                cuponuevo: dispo.cupomaximonuevo,
                //ntuser: this.profileService.user.usuariont?? '',
                tipo: 'D',
                //enabled: 1
            });
        });
        return this.http.post<UpdateResponse>(`${environment.apiUrl}/UpdateMultiCupo`, payload);
    }

    disableCupo(hora: number, date: number, timeFrom: string, timeTo: string, user: number, hostname: string, observation: string): Observable<any> {
        const payload: CuposUpdatePayload = {
            idhecf: user,
            //ip: this.profileService.user.usuariont ?? '',
            cuponuevo: 0,
           //ntuser: this.profileService.user.usuariont ?? '',
            tipo: 'D',
            //enabled: 0
        }

        return this.http.put(`${environment.apiUrl}/UpdateCupo`, payload);
    }

    createDate(fecha:string, time:string) {
        let times = time.split(':');
        let fechas = fecha.split('-');
        return new Date(+fechas[0],+fechas[1],+fechas[2],+times[0],+times[1]);
    }
   
    getSucursales(): Observable<Sucursal[]> {
        return this.http.get<Sucursal[]>(`${environment.apiUrl}/GetSucursales`);
    }

    getCuposSucursal(sucu: CupoSeleccionado, errors: number[] = []): Observable<CupoSucursal[][]> {
        return this.http.get<CupoSucursal[][]>(`${environment.apiUrl}/GetCuposXHora`+ this.convertJsonToUrlParams(sucu)).pipe(
            map((elem: any) => {
                let arr = elem;
                arr.forEach((elem: CupoSucursal[])=> elem.forEach((cupo,i, arr2)=> {
                    const cupo1 = {...cupo, cupomaximonuevo : cupo.cupomaximo, error : errors.includes(cupo.idhorariosentregacuposfecha) }
                    arr2[i]= cupo1;
                }))
                return arr;
            })  
        );
    }

    getCuposHistorico(filters: any): Observable<CuposHistorico[]> {
        return this.http.get<CuposHistorico[]>(`${environment.apiUrl}/GetCuposHistorico`+ this.convertJsonToUrlParams(filters));
    }
}