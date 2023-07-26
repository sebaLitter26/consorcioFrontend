import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Appartment, Tenant} from '../../../model';
import { ResourceService } from '../../services/resource-control.service'
import { finalize, Observable, Subject, Subscription } from 'rxjs';
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
import { TenantFilters, TenantType } from './model';



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
    tenantFormFilter= new FormGroup ({
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
        /* (item: Tenant) => {
            const TenantTypeStyle: ProcessStateStyle = TENANT_MAP[item.ID_TIPO_NOVEDAD];
            
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
            const tenantTypeStyle: ProcessStateStyle = PROCESS_STATES_MAP[item.ESTADO];

            return {
                "color": tenantTypeStyle.color,
                "padding": "5px 15px",
                "box-sizing": "border-box",
                "width": "100px",
                "border-radius": "5px",
                "background-color": tenantTypeStyle.backgroundColor,
            }
        }, null, null, null, null, null */
    ];

    /** Formatos custom para columnas del listado de novedades. */
    columnFormaters: (((item: Tenant) => string | number | boolean) | null)[] = [
        null, null,       
        /* (item: Tenant) => {
            return item.DESCRIPCION ?? '-';
        },
        (item: Tenant) => {
            let date = new Date(item.FECHA);
            return `${date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}` ?? '-';
        },
        (item: Tenant) => {
            return NOVELTIES_MAP[item.ID_TIPO_NOVEDAD].label;
        },
        (item: Tenant) => {
            return `${PROCESS_STATES_LABELS_MAP[item.ESTADO]}`;
        }, */
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



    private _getFilters(): TenantFilters {
        return {
            tipoInquilino: null, //this.tenantFormFilter.controls.tenantTypeControl.value?.toString() ?? null,
            estado: null, //this.tenantFormFilter.controls.tenantStateControl.value?.toString() ?? null,
            fechaDesde: null, //this.tenantFormFilter.controls.dateFromControl.value,
            fechaHasta: null, //this.tenantFormFilter.controls.dateToControl.value,
            nroReserva: null, //this.tenantFormFilter.controls.nroReservaControl.value?.toString() ?? null,
            //idNovedad: this.tenantFormFilter.controls.tenantControl.value,
            limit: 10,
            page: 1
        };
    }


    /**
     * Actualiza la tabla de novedades con los filtros indicados.
     */
    update(): void {
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        this.actionsSubscription$ = this.recursosService.getTenants().pipe(
            finalize(() => {
                setTimeout(() => {
                    this.overlayService.hideLoadingOverlay();
                    this.loading = false;
                    this.tenantUpdateSource.next(true);
                    this.changeDetectorRef.detectChanges();
                }, 100);
            })).subscribe({
            next: (result: Tenant[]) => {
                this.tenants = result;
                
                if (this.tenants.length == 0) {
                    this.snackBarService.open("No se encontraron inquilinos para los filtros ingresados", "Aceptar", 6000, "warning-snackbar");
                }
            },
            error: (error: HttpErrorResponse) => {
                this.tenants = [];
                
            },
        });
    }

    ngOnDestroy(): void {
        this.actionsSubscription$?.unsubscribe();
    }

}
