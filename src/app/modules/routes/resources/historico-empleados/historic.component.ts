import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type} from '@angular/core';
import { Psico, FilterPsico, Empleado } from '../models/order.model';
import { RRHHControlService } from '../services/rrhh-control.service'
import {  Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { DynamicComponent, DynamicTableDefinition, ItemDetailComponent } from '../../../ui/dynamic-table';
import { DatePipe } from '@angular/common';
import { EmpleadoInformationComponent } from './empleado-detail/empleado-detail.component';
import { Router } from '@angular/router';
import { StringShowMore } from 'src/app/modules/common/string-show-more/string-show-more.component';
import { StringShowMoreData, StringSplitterData } from 'src/app/modules/common';
import { PluImageComponent } from '../../../common/plu-image/plu-image.component';

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
export class EmployeeHistoricComponent{

    today = new Date();

    formRenditionListGroup = this.fb.group({
        /** `FormControl` con el periodado de fechas a filtrar. */
        fechaDesdeControl: [this.today.toISOString() , [Validators.required]],

        fechaHastaControl: [ this.today.toISOString(), [Validators.required]],
        legajoControl: [''],
        dniControl: [''],
        resultadoControl: [''],
      });


    loading: boolean = false;

    resultados: string[] = [
        '',
        'Apto',
        'No apto',
        'Apto +',
        'Sin resultado'
    ];
    
    tableUpdateSource: Subject<boolean> = new Subject<boolean>();

    /** Definicion de las columnas del listado del control seleccionado. Puede ser Control de retorno o tecnico o comercial */
    tableDefinition: DynamicTableDefinition = {
        displayedColumns: [
            'foto',
            'legajo',
            'apellido_nombre',
            'subdivision',
            'sector',
            'des_funcion',
            'fecha_toma',
            'result',
            'puesto',
            'observaciones',
            'finsert',
        ],
        headerCellDefinitions: [
            'IMAGEN',
            'LEGAJO',
            'NOMBRE Y APELLIDO',
            'SUC SOLICITA',
            'SECTOR',
            'FUNCION',
            'FECHA TOMA',
            'RESULTADO',
            'PUESTO POSTULADO',
            'OBSERVACIONES',
            'F. INSERCIÓN'
        ],
    }

    /** Componente de detalle a mostrar en la lista de productos. */
    itemDetailComponent: Type<ItemDetailComponent> = EmpleadoInformationComponent;

    /** Componentes custom para listado del psicotecnicos.  */
    customColumnComponents: (DynamicComponent | null)[] = [
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
    ];

    /** Formatos custom para columnas del listado de control seleccionado. */
    columnFormaters: (((control: Psico) => string | number | boolean) | null)[] = [
        null, null,null, null, null, null, null,
        (item: Psico) => {
            const date: Date = new Date(item?.fecha_toma);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? item.fecha_toma : formatedDate}`;
        },
        null, null,null,
        (item: Psico) => {
            const date: Date = new Date(item?.idcarga);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? item.idcarga : formatedDate}`;
        }
    ];

    /** Informacion de todos los psicotecnicos entre las fechas seleccionadas. */
    psicos: Psico[] = [];

    constructor(
        public recursosService: RRHHControlService,
        private overlayService: OverlayService,
        private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private datepipe: DatePipe,
        public router: Router,
    ) {
        this.searchEmpleado();
    }

    searchEmpleado() : void {

        const formList = this.formRenditionListGroup.controls;

        const filters: FilterPsico = {
            desde: this.datepipe.transform(new Date(formList.fechaDesdeControl.value!), 'yyyyMMdd')!, 
            hasta: this.datepipe.transform(new Date(formList.fechaHastaControl.value ?? this.today), 'yyyyMMdd')!,
            legajo: formList.legajoControl.value ?? '',
            doc_nro: formList.dniControl.value ?? '',
            result: formList.resultadoControl.value ?? '',
        }
       
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
        this.recursosService.getPsico(filters).subscribe((data: Psico[]) => {
            
            this.psicos = data;
            
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
