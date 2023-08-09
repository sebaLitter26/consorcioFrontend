import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class AppartmentSharedService {

    /** Un subject que es llamado cuando se hace una modificacion en los conteos y hay que actualizar la tabla. */
    private updateAppartmentEventSource = new Subject<boolean>();

    /** Evento disparado cuando se tiene que actualizar la tabla de conteos. */
    updateAppartmentEvent: Observable<boolean> = this.updateAppartmentEventSource.asObservable();

    constructor() {}

    /**
     * Avisa a los observers que hay que actualizar la tabla
     */
    updateTable() {
        this.updateAppartmentEventSource.next(true);
    }
}