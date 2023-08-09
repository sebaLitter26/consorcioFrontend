import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type} from '@angular/core';
import { CuposHistorico, Sucursal } from '..';
import { SucursalService } from '../services/sucursal.service'
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../../../../overlay/services/overlay.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { DynamicTableDefinition } from '../../../../../ui/dynamic-table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


const day_format = (miliseconds: string) => [miliseconds.slice(0, 4), '-', miliseconds.slice(4,6), '-',miliseconds.slice(6,8)].join('');

@Component({
    selector: 'app-historic',
    templateUrl: './historic.component.html',
    styleUrls: ['./historic.component.scss'],
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
export class CupoHistoricComponent{

    today = new Date();

    sucursal$ : Observable<Sucursal[]> | null = null;  

    formRenditionListGroup: FormGroup = new FormGroup({
        /** `FormControl` con el periodado de fechas a filtrar.   this.today.toISOString()*/
        fechaDesdeControl: new FormControl( '', [Validators.required]),  

        fechaHastaControl: new FormControl( '', [Validators.required]),

        /** `FormControl` con la sucursal. */
        sucursalControl: new FormControl( '91',[Validators.required]),
      });


    loading: boolean = false;
    
    tableUpdateSource: Subject<boolean> = new Subject<boolean>();

    /** Definicion de las columnas del listado del control seleccionado. Puede ser Control de retorno o tecnico o comercial */
    tableDefinition: DynamicTableDefinition = {
        displayedColumns: [
            'cuposofrecidos',
            'cuposvendidos',
            'diasemana',
            'fecha',
            'horacupo',
            'nrosemana',
            'promediosemanalcuposofrecidos',
            'promediosemanalcuposvendidos',
            'semanafin',
            'semanainicio',
            'vendidosofrecidos',
        ],
        headerCellDefinitions: [
            'OFRECIDOS',
            'VENDIDOS',
            'DIA SEMANA',
            'FECHA',
            'HORA',
            'NRO. SEMANA',
            'PROMEDIO SEMANAL OFRECIDOS',
            'PROMEDIO SEMANAL VENDIDOS',
            'SEMANA FINAL',
            'SEMANA DE INICIO',
            'VENDIDOS - OFRECIDOS',
        ],
    }

    /** Componente de detalle a mostrar en la lista de productos. */
    //itemDetailComponent: Type<ItemDetailComponent> = CupoInformationComponent;

    /** Componentes custom para listado del psicotecnicos.  */
    /* customColumnComponents: (DynamicComponent | null)[] = [
        null,
        {
            type: PluImageComponent,
            componentData: <StringSplitterData>{
                propertyPath: 'foto',
            },
        },
        null, null, null, null, null, null, null, null,
        {
            type: StringShowMore,
            componentData: <StringShowMoreData>{
                propertyPath: 'observaciones',
                maxLength: 65,
            },
        }, 
        null, 
    ]; */

    /** Formatos custom para columnas del listado de control seleccionado. */
    columnFormaters: (((control: CuposHistorico) => string | number | boolean) | null)[] = [
        null, null,null, 
        (item: CuposHistorico) => {
            return day_format(item?.fecha);
            /* const date: Date = new Date(item?.fecha);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? item.fecha : formatedDate}`; */
        }, null, null, null, null,
        (item: CuposHistorico) => {
            return day_format(item?.semanafin);
        },
        (item: CuposHistorico) => {
            return day_format(item?.semanainicio);
        },
        null
    ];

    /** Informacion de todos los psicotecnicos entre las fechas seleccionadas. */
    cuposHistoricos: CuposHistorico[] = [];

    constructor(
        private recursosService: SucursalService,
        private overlayService: OverlayService,
        //private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private datepipe: DatePipe,
        public router: Router,
    ) {
        //this.searchCupo();
        this.sucursal$ = this.recursosService.getSucursales();
    }

    searchCupo() : void {
        const formList = this.formRenditionListGroup.controls;

        const filters: any = {
            fechadesde: this.datepipe.transform(new Date(formList.fechaDesdeControl.value!), 'yyyyMMdd')!, 
            fechahasta: this.datepipe.transform(new Date(formList.fechaHastaControl.value ?? this.today), 'yyyyMMdd')!,
            sucursal: formList.sucursalControl.value ?? ''
        }
       
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
        this.recursosService.getCuposHistorico(filters).subscribe((data: CuposHistorico[]) => {
            
            this.cuposHistoricos = data;
            
            this.overlayService.hideLoadingOverlay();
            this.loading = false;
            this.changeDetectorRef.detectChanges();
            
            setTimeout(() =>{
                this.tableUpdateSource.next(true);
                this.changeDetectorRef.detectChanges();
            }, 100);
            

        });
    }

}
