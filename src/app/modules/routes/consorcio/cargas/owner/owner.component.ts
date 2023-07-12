import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Appartment, Owner} from '../../../model';
import { ResourceService } from '../../services/resource-control.service'
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from '../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { User } from '../../../user';


@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
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
export class OwnerComponent implements OnInit{

    owner$: Observable<Owner[]> = this.recursosService.getOwners(); 
    appartment$: Observable<Appartment[]> = this.recursosService.getAppartments(); 
    user$: Observable<User[]> = this.recursosService.getUsers(); 

    today = new Date();
    loading: boolean = false;
    isChangedAnimation: Subject<boolean> = new Subject<boolean>();

    formOwner = new FormGroup ({
        /** `FormControl` con el tipo de legajo a filtrar. */
        userControl: new FormControl('',[Validators.required]),
        appartmentControl: new FormControl(1,[Validators.required]),
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

    createOwner(): void{
        const formOwner = this.formOwner.controls;

        //if (!filters.legajo ) return;
        this.overlayService.displayLoadingOverlay();
        this.loading = true;

        const owner: any = {
            id_user: formOwner.userControl.value,
            id_appartment: formOwner.appartmentControl.value,
            //id: (this.tabIndex<1 && this.psicotecnico?.id) ? this.psicotecnico?.id : 0,
        }

        this.recursosService.insertOwner(owner).subscribe((data: Owner) => {
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
