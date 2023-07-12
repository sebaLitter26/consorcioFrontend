import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Appartment, Tenant} from '../../../model';
import { RRHHControlService } from '../../services/resource-control.service'
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';


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

    tenant$: Observable<Tenant[]> = this.recursosService.getTenants(); 

    today = new Date();
    loading: boolean = false;
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    formTenant = new FormGroup ({
        /** `FormControl` con el tipo de legajo a filtrar. */
        userControl: new FormControl('',[Validators.required]),
        appartmentControl: new FormControl(1,[Validators.required]),
    });

    

    constructor(
        public recursosService: RRHHControlService,
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

    createtenant(): void{
        const formtenant = this.formtenant.controls;

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        const tenant: any = {
            street: formtenant.streetControl.value,
            number: formtenant.numberControl.value,
            location: formtenant.locationControl.value,
            photo: formtenant.imageControl.value,
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


    findUser(legajo: number){
        if (!legajo ) return;
        
        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        //this.empleado$ = this.recursosService.getEmpleadoByLegajo(legajo);
        //this.updateForm();
        
    }

}
