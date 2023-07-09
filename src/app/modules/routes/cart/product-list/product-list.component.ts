import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Empleado, Sector, Sucursal, FormPsico, Psico } from '../models/order.model';
import { CartService } from '../services/cart.service'
import { Observable, Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
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

    psicotecnico?: Psico;
    empleado$: Observable<Empleado> | null = null;
    sucursal$ : Observable<Sucursal[]> = this.cartService.getSucursales();  
    sector$: Observable<Sector[]> = this.cartService.getSectores();
    /* GProf$ : Observable<Nomina[]> = this.cartService.getEmpleadoByLegajo(128346); */
    tipoDocumentos: string[] = [
        'D.N.I.',
        'C.I.',
        'L.C.'
    ];

    resultados: string[] = [
        'Apto',
        'No apto',
        'Apto +',
        'Sin resultado'
    ];


    today = new Date();
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    selectedSucursal: number = 1;
    loading: boolean = false;

    canSave: boolean = true;

    tabIndex: number = 0;

    formRenditionListGroup = this.fb.group({
        /** `FormControl` con el tipo de legajo a filtrar. */
        legajoControl: [''],

        sectorControl: ['', [Validators.required]],
        /** `FormControl` con la sucursal. */
        sucursalControl: ['',[Validators.required]],
        /** `FormControl` las fechas de la fecha. */
        fechaControl: [this.today],
        /** `FormControl` con el puesto a ocupar. */
        puestoControl: [''],
        /** `FormControl` con la postula. */
        postulaControl: [''],
        /** `FormControl` con el resultado. */
        resultadoControl: [ '',[Validators.required]],

        psicologoControl: ['',[Validators.required]],

        bateriaTextControl: [''],

        verazControl: [false],

        nombreControl: ['',[Validators.required]],
        tipoDocumentoControl: ['D.N.I.',[Validators.required]],
        documentoControl: ['',[Validators.required, Validators.pattern("^[0-9]{8,15}$")]],

        observacionesControl: ['',[Validators.required]],
        activoControl: [false],
    });

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
    
        this.psicotecnico = this.activatedRoute.snapshot.queryParams as Psico;
        if(!this.psicotecnico.legajo){
            this.psicotecnico = undefined;
            return;
        }
        
        this.findLegajo(this.psicotecnico.legajo);
        
    }



    products = [
        'Get to work',
        'Pick up groceries',
        'Go home',
        'Fall asleep',
        'Get up',
        'Brush teeth',
        'Take a shower',
        'Check e-mail',
        'Walk dog'
      ];
    
    cart = [''];
    
    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
      }






    modifyPsicotecnico() : void {
      
        const formList = this.formRenditionListGroup.controls;

        const filters: FormPsico = {
            legajo: formList.legajoControl.value ?? "0",
            sector: `${formList.sectorControl.value}`,
            sucursalsolicitante: `${formList.sucursalControl.value}`,
            fecha: formList.fechaControl.value,
            puestopostulado: formList.puestoControl.value ?? '',
            postula: formList.postulaControl.value ?? '',
            result: formList.resultadoControl.value,
            psicologo: formList.psicologoControl.value,
            bateriatests: formList.bateriaTextControl.value ?? '',
            tieneveraz: formList.verazControl.value ?? false,
            observaciones: formList.observacionesControl.value,
            activo: formList.activoControl.value ?? false,
            apellidonombre: formList.nombreControl.value,
            cargo: '',
            refpsico: false,
            gr_prof: '',
            doc_tipo: formList.tipoDocumentoControl.value,
            doc_nro: `${formList.documentoControl.value}`,
            idcarga: this.today.toISOString(),
            nombreusuario: this.profileService.user.email,
            nombreequipo: '', 
            tab: '',
            id: (this.tabIndex<1 && this.psicotecnico?.id) ? this.psicotecnico?.id : 0,
        }

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        this.cartService.insertPsico(filters).subscribe((data: Psico) => {
            this.snackBarService.open(`Se registraron los cambios.`, "Aceptar", 6000, "success-snackbar");
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
    readLegajoOnKeyDownCallback: ((keyboardEvent: KeyboardEvent) => void) = (event: KeyboardEvent) => {
        const legajoInput = this.formRenditionListGroup.controls.legajoControl;
        
        if (typeof legajoInput.value == 'string' && event.key == "Enter") {
            this.findLegajo(+legajoInput.value);
        }
    };

    changeTab(tab:number){
        this.tabIndex = tab; 
        const input_id = document.querySelector('input[id^="coolinput"]')?.id;
        if(input_id) document.getElementById(input_id)?.focus();
        this.changeDetectorRef.detectChanges();
        this.updateForm();
    }

    findLegajo(legajo: number){
        if (!legajo ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        this.empleado$ = this.cartService.getEmpleadoByLegajo(legajo);
        this.updateForm();
        
    }

    updateForm(){
        const formList = this.formRenditionListGroup;
        
        if(this.tabIndex>0 || !this.empleado$){
            this.formRenditionListGroup.enable();
            formList.reset();
            this.canSave = true;
            formList.patchValue({
                tipoDocumentoControl: this.tipoDocumentos[0],
                fechaControl: new Date(this.today),
            });
        }else {

            this.empleado$?.subscribe((trabajador: Empleado) => {  
                
                formList.controls.documentoControl.disable();
                formList.controls.tipoDocumentoControl.disable();
                formList.controls.nombreControl.disable();
                formList.controls.sucursalControl.disable();
                formList.controls.sectorControl.disable();

                this.selectedSucursal = +trabajador.subdivision;
                
                formList.patchValue({
                    legajoControl: `${+trabajador.legajo}`,
                    nombreControl: trabajador.nombre,
                    documentoControl: trabajador.nrodocumento,
                    tipoDocumentoControl: this.tipoDocumentos[+trabajador.tipodocumento-1],
                    puestoControl : (trabajador.funciondescripcion.length>4) ? trabajador.funciondescripcion : this.psicotecnico?.des_funcion,
                    sectorControl: trabajador.sector,
                    sucursalControl: trabajador.subdivision,
                    fechaControl: new Date(this.today),

                    //Datos del informe Psicologico
                    observacionesControl: this.psicotecnico?.observaciones ?? '',
                    psicologoControl: this.psicotecnico?.psicologo ?? '',
                    resultadoControl: this.psicotecnico?.result ?? '',
                    bateriaTextControl: this.psicotecnico?.bateria_tests ?? '',
                    postulaControl: this.psicotecnico?.puesto_postulado,

                });
            
                //this.canSave = !this.psicotecnico  || this.psicotecnico?.non_usuario === this.profileService.user.usuariont;
                if(!this.canSave){
                    formList.disable();
                    formList.controls.legajoControl.enable();
                    this.snackBarService.open(`El perfil psicotecnico ha sido cargado por el legajo ${this.psicotecnico?.non_usuario}. Solo él podra modificarlo.`, "Aceptar", 6000, "error-snackbar");
                }
        
            });
        }
        this.overlayService.hideLoadingOverlay();
        this.loading = false;
        this.changeDetectorRef.detectChanges();

        
    }
}
