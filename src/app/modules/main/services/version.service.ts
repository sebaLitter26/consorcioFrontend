import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiData } from "..";
import { environment } from "../../../../environments/environment";

@Injectable()
export class VersionService {

    constructor(
        private http: HttpClient,
    ) {}

    /**
     * Obtiene la versión actual de la web de RRHH Psico.
     * @returns un `Observable` con la versión en formato `string`
     */
    getWebVersion(): Observable<string> {
        return of(environment.version);
    }

    /**
     * Obtiene la versión actual de la API de RRHH Psico.
     * @returns un `Observable` con la versión formato `string`
     */
    getApiVersion(): Observable<ApiData> {
        return this.http.get<ApiData>(`${environment.apiUrl}API/GetInfo`);
    }

    /**
     * Obtiene la versión actual de la API de interfaces
     * @returns un `Observable` con la versión formato `string`
     */
    getInterfacesVersion(): Observable<string> {
        return this.http.get<string>(`${environment.apiUrl}getVersion`);
    }
}