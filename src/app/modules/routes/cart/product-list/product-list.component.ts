import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Building, Order, Identification, Product } from '../../model';
import { CartService } from '../services/cart.service'
import { Observable, Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    providers: [
        {
          provide: STEPPER_GLOBAL_OPTIONS,
          useValue: {showError: true},
        },
      ],
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
export class ProductListComponent implements OnInit{


    cartFormGroup = this.fb.group({
        cartCtrl: [<Product[]>[], [Validators.required, Validators.minLength(1)]],
    });
    contactFormGroup = this.fb.group({
        phoneCtrl: ['', Validators.required],
        floorCtrl: ['', Validators.required],
        deptoCtrl: ['', Validators.required],
        buildingCtrl: ['', Validators.required],
        observacionesControl: [''],
        //fechaControl: [this.today],
    });

    building$ : Observable<Building[]> = this.cartService.getBuildings();  
    pisosEdificio: number[] = [1,2,3,4,5,6,7,8,9];
    deptosEdificio: string[] = ['A', 'B', 'C'];

    today = new Date();
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();
    
    identification?: Identification;
    orders?: Order[];

    order?: Order;
    loading: boolean = false;


   
    constructor(
        public cartService: CartService,
        private overlayService: OverlayService,
        private fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
        private activatedRoute: ActivatedRoute, 
        public router: Router,
        private profileService: ProfileService, 
    ) {}

    ngOnInit(): void {
        /** Obtiene la lista de conteos precargada por el resolver */
        this.loading = true;
    
        this.identification = this.activatedRoute.snapshot.queryParams as Identification;
        if(!this.identification.building){
            this.identification = undefined;
            return;
        }
        
        this.findUser(this.identification.phone);
        
    }



    products: Product[] = [
        { brand:'Oreo', photo:'img/1233', price:345, name:'Galletitas', stock:10 },
        { brand:'Mr. Musculo', photo:'img/1244', price:345, name:'Detergente', stock: 5 },
        { brand:'Playadito', photo:'img/1255', price:345, name:'Yerba', stock: 7 },
        { brand:'Felt-Fort', photo:'img/1266', price:345, name:'Chocolate', stock: 8 },
        { brand:'Andes', photo:'img/1277', price:345, name:'Cerveza', stock: 9 },
        { brand:'Esperado', photo:'img/1288', price:345, name:'Vino', stock:2 },
        { brand:'Arcor', photo:'img/1299', price:345, name:'Arberja', stock: 6 },
        { brand:'La Campañola', photo:'img/1300', price:345, name:'Atun', stock: 8 },
        { brand:'Arcor', photo:'img/1311', price:345, name:'Azucar', stock:10 },
    ];
    
    cart: any[] = [];
    
    drop(event: CdkDragDrop<Product[]> ) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
        
    }


    confirmCart(){

    }


    modifyOrder() : void {
      
        const formList = this.cartFormGroup.controls;

        const filters: Order = {
            cart: this.cart,
            building: 'dnsdnoe',
            depto:'B',
            floor:1,
            phone:1165404122,
            observaciones: '',
            
            id: this.order?.id ?? 0,
        }

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        this.cartService.createOrder(filters).subscribe((data: Order) => {
            this.snackBarService.open(`Se registro la compra.`, "Aceptar", 6000, "success-snackbar");
            //this.empleado = data.Data;
            setTimeout(() =>{
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            }, 100);

        });
    }

    /**
     * Callback a utilizar en el input de lectura de Legajo, y que se ejecuta luego de presionar enter.
     *
     * Se encarga de consultar los datos del Empleado.
     */
    /* readLegajoOnKeyDownCallback: ((keyboardEvent: KeyboardEvent) => void) = (event: KeyboardEvent) => {
        const legajoInput = this.formRenditionListGroup.controls.legajoControl;
        
        if (typeof legajoInput.value == 'string' && event.key == "Enter") {
            this.findUser(+legajoInput.value);
        }
    }; */

 

    findUser(phone: number){
        if (!phone ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        
    }

    
}
