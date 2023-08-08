import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Appartment, Building, Owner, Tenant} from '../../model';
import { ResourceService } from '../services/resource-control.service'
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { User } from '../../user';


@Component({
    selector: 'app-cargas',
    templateUrl: './cargas.component.html',
    styleUrls: ['./cargas.component.scss'],
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
export class CargasComponent implements OnInit{

    /* psicotecnico?: Psico;
    empleado$: Observable<Empleado> | null = null; 
    sucursal$ : Observable<Sucursal[]> = this.recursosService.getSucursales();  
    sector$: Observable<Sector[]> = this.recursosService.getSectores(); */
    /* GProf$ : Observable<Nomina[]> = this.recursosService.getEmpleadoByLegajo(128346); */
   

    building$: Observable<Building[]> = this.recursosService.getBuildings(); 
    appartment$: Observable<Appartment[]> = this.recursosService.getAppartments(); 
    user$: Observable<User[]> = this.recursosService.getUsers(); 


    today = new Date();
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    selectedSucursal: number = 1;
    loading: boolean = false;

    canSave: boolean = true;

    tabIndex: number = 0;

    

    

    

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
        
    
        /* this.psicotecnico = this.activatedRoute.snapshot.queryParams as Psico;
        if(!this.psicotecnico.legajo){
            this.psicotecnico = undefined;
            return;
        }
        
        this.findLegajo(this.psicotecnico.legajo); */
        
    }

    



    


    changeTab(tab:number){
        this.tabIndex = tab; 
        
        const arrDir = ['building', 'appartment', 'owner', 'tenant'];
        
        this.router.navigate(['consorcio/cargas',{ outlets: { carga: [`${arrDir[tab]}`] } }]);

        /* const input_id = document.querySelector('input[id^="coolinput"]')?.id;
        if(input_id) document.getElementById(input_id)?.focus(); */
        this.changeDetectorRef.detectChanges();
        //this.updateForm();
    }

    findLegajo(legajo: number){
        if (!legajo ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        //this.empleado$ = this.recursosService.getEmpleadoByLegajo(legajo);
        //this.updateForm();
        
    }

    /* updateForm(){
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
                    //puestoControl : (trabajador.funciondescripcion.length>4) ? trabajador.funciondescripcion : this.psicotecnico?.des_funcion,
                    sectorControl: trabajador.sector,
                    sucursalControl: trabajador.subdivision,
                    fechaControl: new Date(this.today),

                 

                });
            
                //this.canSave = !this.psicotecnico  || this.psicotecnico?.non_usuario === this.profileService.user.usuariont;
                if(!this.canSave){
                    formList.disable();
                    formList.controls.legajoControl.enable();
                    //this.snackBarService.open(`El perfil psicotecnico ha sido cargado por el legajo ${this.psicotecnico?.non_usuario}. Solo él podra modificarlo.`, "Aceptar", 6000, "error-snackbar");
                }
        
            });
        }
        this.overlayService.hideLoadingOverlay();
        this.loading = false;
        this.changeDetectorRef.detectChanges();

        
    } */
}
