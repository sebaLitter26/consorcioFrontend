import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackBarService } from 'src/app/services/snackbar.service';
import { SucursalService } from '../services/sucursal.service';
import { CupoSelection, CupoSucursal } from '..';
import { first, map, Observable, of, Subscription, takeWhile } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-appartment-registry',
    templateUrl: './appartment-registry.component.html',
    styleUrls: ['./appartment-registry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppartmentComponent{

    /* @Input() disponibilidad: Disponibilidad[] = [];
    @Input() ocupacion: Ocupacion[] = []; */
    @Input() appartment?: CupoSucursal;
    @Input() dia: any;
    @Input() updateSource: Observable<CupoSelection[]> = of([]);

    @Output() cupoSelectedEvent: EventEmitter<CupoSelection> = new EventEmitter();

    //disponibilidad!: CupoSucursal;
    //ocupacion!: Ocupacion;

    //allBusy: boolean = false;
    currentBox!: CupoSelection;
    inFilter: boolean = false;

    //times: TimeRange[] = [];
    //busyTimes: TimeRange[] = [];
    
    private subscription$!: Subscription;

    formRenditionListGroup : FormGroup = new FormGroup({
        /** `FormControl` con el tipo de legajo a filtrar. */
        cupoMaximoControl: new FormControl(0),
    });
    
    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private sucursalService: SucursalService,
        private snackBarService: SnackBarService,
        private changeDetectorRef: ChangeDetectorRef,
        private fb: FormBuilder,
    ) {}

    

    ngOnInit(): void {

        //Validaciones especiales de acuerdo al perfil del usuario
        this.formRenditionListGroup.patchValue({
            cupoMaximoControl: this.appartment?.cupomaximo
        });
        
        
        if (this.appartment && this.dia && this.dia.compareDate) {
            this.currentBox = {...this.appartment, selected: false   };  // hora: this.appartment.hora, dia: this.dia.compareDate,
          
            this.subscription$ = this.updateSource.subscribe((selectedCupos: CupoSelection[]) =>{
                
                const cupo_aux = selectedCupos.find(elem=> this.currentBox.dia == elem.dia && elem.hora == this.currentBox.hora);
                
                if(cupo_aux){
                    cupo_aux.selected = true;
                    this.currentBox = cupo_aux;
                }else
                    this.currentBox.selected= false;
                //this.changeDetectorRef.detectChanges();
            });
        }
    }

    getBackgroundColor(){
        let color = '';
        if(this.currentBox.error)
            color ='var(--color-unfit)'
        if(this.currentBox?.selected)
            color ='var(--color-ok)'
        if(this.currentBox?.cupomaximonuevo != this.currentBox?.cupomaximo)
            color ='var(--color-accent)'
        /* else if(this.times?.some(e=> e.selected==true))
            color ='var(--color-accent)' */
        else if (this.inFilter)
            color ='var(--color-border)'
        return color;
    }

    /* openConfirmationDialog(title: string, message: string, color: "warn" | "accent" | "primary") {
        const confirmationDialogData: ConfirmationDialogData = {
            title: title,
            message: message,
            color: color,
            showObservation: true,
        }
        
        this.matDialog.open(ConfirmationDialogComponent, {
            width: "650px",
            data: confirmationDialogData
        }).afterClosed().subscribe((result: boolean | string) => {
            if (result) {
                this.closecupo(<string>result);
            }
        });
    } */

    closecupo($event: MouseEvent): void{
        $event.stopPropagation();
        this.appartmentSelectedEvent.emit(this.currentBox);
    }

    updateCupoDay($event?: MouseEvent){
        
        if(this.appartment){
            this.currentBox.selected = ($event) ? !this.currentBox.selected : true;
            let valor = this.formRenditionListGroup.controls.cupoMaximoControl.value;
            valor = (!valor || valor<0) ? 0 : valor;

            let operation: string = (this.currentBox.cupomaximonuevo < valor) ? 'subir-cupo' : 'bajar-cupo';
            let allowModify = this.sucursalService.posible_operations.some(elem => elem.id == operation);
            if(!allowModify && ( operation == 'subir-cupo' && valor <= this.currentBox.cupomaximo || operation == 'bajar-cupo' && valor >= this.currentBox.cupomaximo )){
                allowModify = true;
            }
            
            if(this.currentBox && allowModify) {
                this.currentBox.cupomaximonuevo = valor;
                this.currentBox.error = false;
                
                this.appartmentSelectedEvent.emit(this.currentBox);
            }else
                this.formRenditionListGroup.controls.cupoMaximoControl.setValue(this.currentBox.cupomaximonuevo);
            //this.changeDetectorRef.detectChanges();
        }
    }

    updateCupoForm(){
        const valor = this.formRenditionListGroup.controls.cupoMaximoControl.value;
        if(valor && this.currentBox){
            this.currentBox.cupomaximonuevo = valor;
            this.currentBox.selected = true;
            this.currentBox.error = false;
            
            this.appartmentSelectedEvent.emit(this.currentBox);
        }
    }

    ngOnDestroy() {
        if(this.subscription$)
            this.subscription$.unsubscribe();
    }

}
