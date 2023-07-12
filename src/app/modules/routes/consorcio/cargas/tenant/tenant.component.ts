import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Appartment, Tenant} from '../../../model';
import { ResourceService } from '../../services/resource-control.service'
import { Observable, Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { User } from '../../../user';
import { DynamicComponent, DynamicTableDefinition } from '../../../../ui/dynamic-table';
import { PluImageComponent } from '../../../../common/plu-image/plu-image.component';
import { StringSplitterData } from '../../../../common';
import { StringSplitterComponent } from '../../../../common/string-splitter/string-splitter.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcessStateStyle } from '../../../..';


/** 
 * Mapa de estilos de etiquetas para tipos de novedades.
 * Define la forma en la que se muestran los ids de novedades en el listado de novedades.
 */
const NOVELTIES_MAP: {[keys in NoveltyType]: ProcessStateStyle} = {
    1: {
        label: "FALTANTE",
        color: "white",
        backgroundColor: "var(--color-missing)",
    },
    2: {
        label: "SOBRANTE",
        color: "white",
        backgroundColor: "var(--color-surplus)",
    },
    3: {
        label: "DEFECTUOSO",
        color: "white",
        backgroundColor: "var(--color-defective)",
    },
    4: {
        label: "NO APTO",
        color: "white",
        backgroundColor: "var(--color-unfit)",
    },
}


@Component({
    selector: 'app-tenant',
    templateUrl: './tenant.component.html',
    styleUrls: ['./tenant.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger(
          'inOutAnimation', 
          [
            transition(
              ':enter', 
              [
                style({ height: 0, opacity: 0 }),
                animate('1s ease-out', 
                        style({ height: 300, opacity: 1 }))
              ]
            ),
            transition(
              ':leave', 
              [
                style({ height: 300, opacity: 1 }),
                animate('1s ease-in', 
                        style({ height: 0, opacity: 0 }))
              ]
            )
          ]
        )
    ]
})
export class TenantComponent implements OnInit{

    /** `Subscription` de la consulta del reporte de novedades. */
    actionsSubscription$?: Subscription; 

    
    appartment$: Observable<Appartment[]> = this.recursosService.getAppartments(); 
    user$: Observable<User[]> = this.recursosService.getUsers(); 

    tenants: Tenant[] = [];

    today = new Date();
    loading: boolean = false;
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    formTenant = new FormGroup ({
        /** `FormControl` con el tipo de legajo a filtrar. */
        userControl: new FormControl('',[Validators.required]),
        appartmentControl: new FormControl(1,[Validators.required]),
    });


    /** La definición de la tabla que muestra el listado de novedades. */
    tableDefinition: DynamicTableDefinition = {
        displayedColumns: ["imagen", "SERIE", "ID_NOVEDAD", "ID_TIPO_NOVEDAD", "ESTADO", "ID_RESERVA", "PLU" ,"descripcion", "FECHA", "PALLET_WF", "USUARIO"],
        headerCellDefinitions: ["", "Serie", "ID Novedad", "Tipo de novedad", "Estado", "Reserva", "PLU", "Descripción", "F. de creación", "Pallet WF", "Usuario"],
    }

    /** Componentes custom a usar en el listado de novedades. */
    customComponents:  (DynamicComponent | null)[] = [
        {
            type: PluImageComponent,
            componentData: <StringSplitterData> {
                propertyPath: "PLU",
            },
            
        },
        {
            type: StringSplitterComponent,
            componentData: <StringSplitterData> {
                propertyPath: "series",
            },
            
        },  null, null, null, null, null, null, null, null
    ];

    /** Estilos custom para columnas del listado de novedades. */
    columnStyles: (((item: Tenant) => {[key: string]: string}) | null)[] = [
        null, null, null,
        (item: Tenant) => {
            const TenantTypeStyle: ProcessStateStyle = NOVELTIES_MAP[item.ID_TIPO_NOVEDAD];
            
            return {
                "color": TenantTypeStyle.color,
                "padding": "5px 15px",
                "box-sizing": "border-box",
                "width": "110px",
                "border-radius": "5px",
                "background-color": TenantTypeStyle.backgroundColor,
            }
        },
        (item: Tenant) => {
            const noveltyTypeStyle: ProcessStateStyle = PROCESS_STATES_MAP[item.ESTADO];

            return {
                "color": noveltyTypeStyle.color,
                "padding": "5px 15px",
                "box-sizing": "border-box",
                "width": "100px",
                "border-radius": "5px",
                "background-color": noveltyTypeStyle.backgroundColor,
            }
        }, null, null, null, null, null
    ];

    /** Formatos custom para columnas del listado de novedades. */
    columnFormaters: (((item: Tenant) => string | number | boolean) | null)[] = [
        null, null,
        (item: Tenant) => {
            return item.ID_NOVEDAD ?? '-';
        },
        (item: Tenant) => {
            return NOVELTIES_MAP[item.ID_TIPO_NOVEDAD].label;
        },
        (item: Tenant) => {
            return `${PROCESS_STATES_LABELS_MAP[item.ESTADO]}`;
        },
        (item: Tenant) => {
            return item.ID_RESERVA ?? '-';
        },
        (item: Tenant) => {
            return item.PLU ?? '-';
        },
        (item: Tenant) => {
            return item.DESCRIPCION ?? '-';
        },
        (item: Tenant) => {
            let date = new Date(item.FECHA);
            return `${date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}` ?? '-';
        },
    ];

    tenantUpdateSource: Subject<boolean> = new Subject<boolean>();

    

    constructor(
        public recursosService: ResourceService,
        private overlayService: OverlayService,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
        private activatedRoute: ActivatedRoute, 
        public router: Router,
        private profileService: ProfileService, 
    ) {}

    ngOnInit(): void {
        /** Obtiene la lista de conteos precargada por el resolver */
        this.loading = true;
        this.update();
    
        /* this.psicotecnico = this.activatedRoute.snapshot.queryParams as Psico;
        if(!this.psicotecnico.legajo){
            this.psicotecnico = undefined;
            return;
        }
        
        this.findLegajo(this.psicotecnico.legajo); */
        
    }

    createTenant(): void{
        const formTenant = this.formTenant.controls;

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        const tenant: any = {
            user: formTenant.userControl.value,
            appartment: formTenant.appartmentControl.value,
            status: 1
            //id: (this.tabIndex<1 && this.psicotecnico?.id) ? this.psicotecnico?.id : 0,
        }

        this.recursosService.insertTenant(tenant).subscribe((data: Tenant) => {
            this.snackBarService.open(`Se registraron los cambios.`, "Aceptar", 6000, "success-snackbar");
            //this.empleado = data.Data;
            setTimeout(() =>{
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            }, 100);

        });

    }



    private _getFilters(): NoveltyFilters {
        return {
            tipoNovedad: this.noveltyForm.controls.noveltyTypeControl.value?.toString() ?? null,
            estado: this.noveltyForm.controls.noveltyStateControl.value?.toString() ?? null,
            fechaDesde: this.noveltyForm.controls.dateFromControl.value,
            fechaHasta: this.noveltyForm.controls.dateToControl.value,
            nroReserva: this.noveltyForm.controls.nroReservaControl.value?.toString() ?? null,
            idNovedad: this.noveltyForm.controls.noveltyControl.value,
        };
    }


    /**
     * Actualiza la tabla de novedades con los filtros indicados.
     */
    update(): void {
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        this.actionsSubscription$ = this.recursosService.getTenants(this._getFilters()).subscribe({
            next: (result: Tenant[]) => {
                this.tenants = result;
                this.overlayService.hideLoadingOverlay();
                this.loading = false;

                setTimeout(() => {
                    this.tenantUpdateSource.next(true);
                    this.changeDetectorRef.detectChanges();
                }, 100);
                
                if (this.tenants.length == 0) {
                    this.snackBarService.open("No se encontraron inquilinos para los filtros ingresados", "Aceptar", 6000, "warning-snackbar");
                }
            },
            error: (error: HttpErrorResponse) => {
                this.tenants = [];
                this.loading = false;

                setTimeout(() => {
                    this.tenantUpdateSource.next(true);
                    this.changeDetectorRef.detectChanges();
                }, 100);
            },
        });
    }

    ngOnDestroy(): void {
        this.actionsSubscription$?.unsubscribe();
    }

}
