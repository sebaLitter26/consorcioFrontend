import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type} from '@angular/core';
import { Building } from '../../model';
import { ResourceService } from '../services/resource-control.service'
import {  Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
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
export class ReportComponent{

    today = new Date();

    formRenditionListGroup = new FormGroup ({
        /** `FormControl` con el periodado de fechas a filtrar. */
        fechaDesdeControl: new FormControl (this.today.toISOString() , [Validators.required]),

        fechaHastaControl: new FormControl ( this.today.toISOString(), [Validators.required]),
        addressControl: new FormControl (''),
         
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
            'address',
            'createdAt',
        ],
        headerCellDefinitions: [
            'IMAGEN',
            'DIRECCIÓN',
            'F. INSERCIÓN'

        ],
    }

    /** Componente de detalle a mostrar en la lista de productos. */
    itemDetailComponent: Type<ItemDetailComponent> = EmpleadoInformationComponent;

    /** Componentes custom para listado del psicotecnicos.  */
    customColumnComponents: (DynamicComponent | null)[] = [
        {
            type: PluImageComponent,
            componentData: <StringSplitterData>{
                propertyPath: 'foto',
            },
        },
        null, null, 
        /* null, null, null, null, null, null,
        {
            type: StringShowMore,
            componentData: <StringShowMoreData>{
                propertyPath: 'observaciones',
                maxLength: 65,
            },
        }, 
        null,  */
    ];

    /** Formatos custom para columnas del listado de control seleccionado. */
    columnFormaters: (((control: Building) => string | number | boolean) | null)[] = [
        null, null,
       
        /* null, null,null,
        (item: Building) => {
            if(!item.deletedAt) return ' - ' 
            const date: Date = new Date(item?.deletedAt);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? item.deletedAt : formatedDate}`;
        } */
    ];

    /** Informacion de todos los psicotecnicos entre las fechas seleccionadas. */
    datos: Building[] = [];

    constructor(
        public recursosService: ResourceService,
        private overlayService: OverlayService,
        private changeDetectorRef: ChangeDetectorRef,
        private datepipe: DatePipe,
        public router: Router,
    ) {
        this.searchBuilding();
    }

    searchBuilding() : void {

        const formList = this.formRenditionListGroup.controls;

        const filters: any = {
            desde: this.datepipe.transform(new Date(formList.fechaDesdeControl.value!), 'yyyyMMdd')!, 
            hasta: this.datepipe.transform(new Date(formList.fechaHastaControl.value ?? this.today), 'yyyyMMdd')!,
            address: formList.addressControl.value ?? '',
        }
       
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
        this.recursosService.getBuildings(filters).subscribe((data: Building[]) => {
            
            console.log(data);
            
            this.datos = data;
            
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
