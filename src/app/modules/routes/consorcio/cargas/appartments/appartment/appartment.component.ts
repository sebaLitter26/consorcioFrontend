import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Appartment, Building} from '../../../../model';
import { ResourceService } from '../../../services/resource-control.service'
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';


@Component({
    selector: 'app-appartment',
    templateUrl: './appartment.component.html',
    styleUrls: ['./appartment.component.scss'],
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
export class AppartmentComponent implements OnInit{

    building$: Observable<Building[]> = this.recursosService.getBuildings(); 

    today = new Date();
    loading: boolean = false;
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    formAppartment = new FormGroup ({
        /** `FormControl` con el tipo de legajo a filtrar. */
        buildingControl: new FormControl('',[Validators.required]),
        floorControl: new FormControl(1,[Validators.required, Validators.pattern("^[0-9]{1,2}$")]),
        divisionControl: new FormControl('',[Validators.required, Validators.pattern("^[A-Ha-h]{1}$")]),
    });

    

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
    
        /* this.psicotecnico = this.activatedRoute.snapshot.queryParams as Psico;
        if(!this.psicotecnico.legajo){
            this.psicotecnico = undefined;
            return;
        }
        
        this.findLegajo(this.psicotecnico.legajo); */
        
    }

    createAppartment(): void{
        const formAppartment = this.formAppartment.controls;

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        const appartment: any = {
            building: formAppartment.buildingControl.value,
            division: formAppartment.divisionControl.value,
            floor: formAppartment.floorControl.value,
            status: 1
            //id: (this.tabIndex<1 && this.psicotecnico?.id) ? this.psicotecnico?.id : 0,
        }

        this.recursosService.insertAppartment(appartment).subscribe((data: Appartment) => {
            this.snackBarService.open(`Se registraron los cambios.`, "Aceptar", 6000, "success-snackbar");
            //this.empleado = data.Data;
            setTimeout(() =>{
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            }, 100);

        });

    }

    
 /*
    modifyPsicotecnico() : void {

        
    }

    findLegajo(legajo: number){
        if (!legajo ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        //this.empleado$ = this.recursosService.getEmpleadoByLegajo(legajo);
        //this.updateForm();
        
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
