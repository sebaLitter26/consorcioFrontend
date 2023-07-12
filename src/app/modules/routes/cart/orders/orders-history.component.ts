import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Type} from '@angular/core';
import { Order } from '../../model';
import { CartService } from '../services/cart.service'
import {  Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { DynamicComponent, DynamicTableDefinition, ItemDetailComponent } from '../../../ui/dynamic-table';
import { DatePipe } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { Router } from '@angular/router';
import { StringShowMore } from 'src/app/modules/common/string-show-more/string-show-more.component';
import { StringShowMoreData, StringSplitterData } from 'src/app/modules/common';
import { PluImageComponent } from '../../../common/plu-image/plu-image.component';

@Component({
    selector: 'app-orders-history',
    templateUrl: './orders-history.component.html',
    styleUrls: ['./orders-history.component.scss'],
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
export class OrderHistoricComponent{

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
    itemDetailComponent: Type<ItemDetailComponent> = OrderDetailComponent;

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
    columnFormaters: (((control: Order) => string | number | boolean) | null)[] = [
        null, null,null, null, null, null, null,
        /* (item: Order) => {
            const date: Date = new Date(item?.fecha_toma);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? item.fecha_toma : formatedDate}`;
        },
        null, null,null,
        (item: Order) => {
            const date: Date = new Date(item?.idcarga);
            const formatedDate: string = `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;

            return `${formatedDate == "Invalid Date" ? item.idcarga : formatedDate}`;
        } */
    ];

    /** Informacion de todos los psicotecnicos entre las fechas seleccionadas. */
    orders: Order[] = [];

    constructor(
        public cartService: CartService,
        private overlayService: OverlayService,
        private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private datepipe: DatePipe,
        public router: Router,
    ) {
        this.searchOrders();
    }

    searchOrders() : void {

        const formList = this.formRenditionListGroup.controls;

        const filters: any = {
            desde: this.datepipe.transform(new Date(formList.fechaDesdeControl.value!), 'yyyyMMdd')!, 
            hasta: this.datepipe.transform(new Date(formList.fechaHastaControl.value ?? this.today), 'yyyyMMdd')!,
            legajo: formList.legajoControl.value ?? '',
            phone: formList.dniControl.value ?? '',
            result: formList.resultadoControl.value ?? '',
        }
       
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
        this.cartService.getOrdersByPhone(filters.phone).subscribe((data: Order[]) => {
            
            this.orders = data;
            
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
