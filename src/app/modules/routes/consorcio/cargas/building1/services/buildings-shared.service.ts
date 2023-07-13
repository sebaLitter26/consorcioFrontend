import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class BuildingSharedService {

    /** Un subject que es llamado cuando se hace una modificacion en los conteos y hay que actualizar la tabla. */
    private updateBuildingEventSource = new Subject<boolean>();

    /** Evento disparado cuando se tiene que actualizar la tabla de conteos. */
    updateBuildingEvent: Observable<boolean> = this.updateBuildingEventSource.asObservable();

    constructor() {}

    /**
     * Avisa a los observers que hay que actualizar la tabla
     */
    updateTable() {
        this.updateBuildingEventSource.next(true);
    }
}