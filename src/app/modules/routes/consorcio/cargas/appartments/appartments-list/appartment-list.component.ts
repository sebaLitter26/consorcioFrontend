
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Appartment, Building, BuildingListFilters, CupoSeleccionado, CupoSelection, CupoSucursal, Sucursal, UpdateResponse } from '..';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../../../ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayService } from '../../../../../overlay/services/overlay.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { finalize, take } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArrayUtils } from 'src/app/utils/array.utils';
import { AppartmentService } from '../services/appartment.service';


const day_format = (miliseconds: string) => [miliseconds.slice(0, 4), '-', miliseconds.slice(4,6), '-',miliseconds.slice(6,8)].join('');

class ColumnDay {
    
    current: Date;
    followingDay: number;
    followingDate: Date;
    formatDate: string;
    compareDate: number;

    constructor(days: number = 1, miliseconds: string) {

        //const day_format = [miliseconds.slice(0, 4), '-', miliseconds.slice(4,6), '-',miliseconds.slice(6,8)].join('');
        
        
        
        this.current = new Date(day_format(miliseconds));
        
        this.followingDay = this.current.getTime()  +  86400000;
        this.followingDate = new Date(this.followingDay);
        this.formatDate = `${this.getDay()}/${this.getMonth()}`;
        this.compareDate = +`${this.followingDate.getFullYear()}${this.getMonth()}${this.getDay()}`; //2022-04-25
    }

    getMonth() {
        return (this.followingDate.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }

    getDay() {
        return (this.followingDate.getDate()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }
}

@Component({
    selector: 'app-appartment-list',
    templateUrl: './appartment-list.component.html',
    styleUrls: ['./appartment-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppartmentsListComponent {

    CANT_DAYS_WEEK: number = 7;

    cupoUpdateEvent: Subject<CupoSelection[]> = new Subject<CupoSelection[]>();

    /** Los andenes actuales. */
    cupos: Appartment[][] = [];

    /* patterns = {
        '0': { pattern: new RegExp(/[0-2]/) },
        '1': { pattern: new RegExp(/[0-9]/) },
        '2': { pattern: new RegExp(/[0-5]/) }
      }; */

      buildingFormGroup: FormGroup = new FormGroup({
        /* horaHastaControl : [<string>'', Validators.required],
        horaDesdeControl : [<string>'', Validators.required], */
        buildingControl: new FormControl( '', Validators.required),
    });

    cupos_error: number[] = [];

    selectedHours = new FormControl([9,13,18]);
    /** Andenes seleccionados para su preparación */
    selectedCupos: CupoSelection[] = [];

    loading: boolean = false;

    week: ColumnDay[] = [];

    horasList: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

    building$ : Observable<Building[]> | null = null;
    
    /* options_time_desde: string[] = [];
    options_time_hasta: string[] = []; */
    filteredOptions?: Observable<string[]>;

    constructor(
        private matDialog: MatDialog,
        private appartmentService: AppartmentService,
        private overlayService: OverlayService,
        private snackBarService: SnackBarService,
        private changeDetectorRef: ChangeDetectorRef,
        //private fb: FormBuilder,
    ) {
        this.building$ = this.appartmentService.getBuildings();
    }


    // Cargo los filtros correspondientes a la columna
    /* fillFilterValues(field: string = ''){
        const arr_hours = (field == 'hora_desde') ? this.options_time_desde: this.options_time_hasta;  
        this.filteredOptions =  of(arr_hours);
        
    } */

    /* onSelectedTime(){
        if(this.sucursalFormGroup.valid){
            this.sucursalService.horaDesde = this.sucursalFormGroup.controls.horaDesdeControl.value ?? '';
            this.sucursalService.horaHasta = this.sucursalFormGroup.controls.horaHastaControl.value ?? '';
            
            //this.cupoUpdateEvent.next(this.selectedCupos);
        }
    } */
    

    /**
     * Actualiza la tabla de CUPOS con los filtros indicados.
     */
    getAppartments(errors: number[] = []): void {

        if(this.buildingFormGroup.invalid) return;
        //this.sucursalService.horaDesde = this.sucursalFormGroup.controls.horaDesdeControl.value ?? '';
        
        const building: BuildingListFilters = {buildingId: this.buildingFormGroup.controls.buildingControl.value}

        this.overlayService.displayLoadingOverlay();
        this.loading = true;
        this.appartmentService.getAppartments(building).pipe(
            take(1),
            finalize(() => {
                this.overlayService.hideLoadingOverlay();
                this.loading = false;
            })
            ).subscribe({
            next: (result: Building) => {
                this.loading = false;
                console.log(result);
                
                if (!result || result.appartments.length == 0){
                    this.snackBarService.open("No se encontraron departamentos para el edificio seleccionado", "Aceptar", 6000, "warning-snackbar");
                    this.loading = false;
                }
                    
                else{
                    //this.cupos = result;

                    /* let arr = result.data.building.appartments;
                arr.forEach((elem: Appartment)=> elem.forEach((cupo,i, arr2)=> {
                    //const cupo1 = {...cupo, cupomaximonuevo : cupo.cupomaximo, error : errors.includes(cupo.idhorariosentregacuposfecha) }
                    arr2[i]= cupo1;
                }))
                return arr; */
                    
                    this.week= [];
                    for (let i= 0; i < this.CANT_DAYS_WEEK; i++) {
                        
                        this.week.push(new ColumnDay(i,`${this.cupos[0][i].dia}`));
                    }
                    
                    /* .sort((a, b) => {
                        if (a.hora < b.hora) return -1;
                        if (a.hora > b.hora) return 1;
                        return 0;
                    }); */
                    this.cupoUpdateEvent.next(this.selectedCupos);
                    this.selectedCupos = [];
                    this.changeDetectorRef.detectChanges();
                }
            },
            error: (e) => {
                this.cupos = [];
                this.loading = false;
                console.error(e);
            }
        });
    }

    _allCupoRowsSelected = (pos: number) => {
        
        if(!this.cupos) return false;
        //const hora = this.cupos[pos][0].hora ;
        
        return this.selectedCupos.filter(elem=> elem.hora == pos).length >= this.CANT_DAYS_WEEK;
        //return this.selectedCupos.filter(elem=> elem.hora == hora).length >= (this.CANT_DAYS_WEEK- (this.sucursalService.disponibilidad[hora] ?? []).length);
        //const abailable: Disponibilidad[] = this.disponibilidad[hora];
        //const busy: Ocupacion[] = this.cupos?.ocupacion[hora] ?? [];
        //return (!abailable) ? false : abailable.every((dispo: Disponibilidad) => dispo.fecha <= this.week[this.CANT_DAYS_WEEK-1].compareDate && this.selectedCupos.includes(dispo) && !busy.find(disable=> disable.fecha===dispo.fecha)) 
        
    };

    _allDayColumnSelected = (day: number) : boolean => {
        if(!this.cupos) return false;
        return this.selectedCupos.filter(elem=> elem.dia === day).length >= 23;
        const cant_Cupos = this.cupos.length;
        let i = cant_Cupos-1;
        let allSelected: boolean = true;
        const selectedByDay = this.selectedCupos.filter(e=> e.dia == day);
        /* do {
            const cupo = this.cupos[i];
            const dispo = (this.sucursalService.disponibilidad[cupo.hora] ?? []).find((e: Disponibilidad)=> e.fecha == day)
            if( !dispo)   // cupo.enabled==1 &&     (this.sucursalService.disponibilidad[this.currentBox.hora] ?? []).find((e: Disponibilidad)=> e.fecha == this.currentBox.fecha)
                allSelected = selectedByDay.findIndex(selected=> selected.hora == cupo.hora) > -1;
                //&&  selected.fecha <= this.week[this.CANT_DAYS_WEEK-1].compareDate && selected.fecha >= this.week[0].compareDate
            i--;
        } while(i>=0 && allSelected); */
        
        return allSelected ?? false;
    };


    handleCupoSelected(dispo: CupoSelection){
        
        if(dispo && dispo.dia) {
            if(dispo.selected && dispo.cupomaximo !== dispo.cupomaximonuevo){
                this.selectedCupos.push(dispo);
            }else
                this.selectedCupos = this.selectedCupos.filter(cupo => !(cupo.dia == dispo.dia && cupo.hora === dispo.hora || cupo.cupomaximo === cupo.cupomaximonuevo));  // && !busy.includes(selected)
            this.cupoUpdateEvent.next(this.selectedCupos);
            this.changeDetectorRef.detectChanges();
        }
    }

    /* availableColumRow(day:string){
        if(!this.cupos?.andenes) return false;
        let available: boolean = false;
        let i = this.cupos?.andenes.length-1;
        do {
            const cupo = this.cupos?.andenes[i];
            available = cupo.enabled == 1; // && this.cupos?.disponibilidad[cupo.hora] && (this.cupos?.disponibilidad[cupo.hora]?.findIndex((dispo: Disponibilidad)=> dispo && dispo.fecha == day) > -1);
            i--;
        } while(i>=0 && !available);
        return available;
    } */

    updateDateColumns(event:MatCheckboxChange, day: number){
        if(!event.checked){
            this.selectedCupos = ArrayUtils.removeDuplicate(this.selectedCupos,'dia','hora',day);
            //this.selectedCupos = this.selectedCupos.filter(elem=> elem.dia != day);
             //filter(seleccionado=> seleccionado.fecha != day);
        } else{
            //let aux: CupoSelection[] = [];
            
            
            let selected: CupoSelection[] = [];
            //this.cupos.map((elem)=>selected.push(...elem.filter(elem=> elem.dia == day)));
            
            /* this.cupos.forEach((cupo:CupoSucursal) =>{
                //const abailable = this.cupos?.disponibilidad[cupo.hora];
                //const busy: Ocupacion[] = this.cupos?.ocupacion[cupo.hora] ?? [];
               if(event.checked)  //cupo.enabled &&
                    selected.push({...cupo, dia:day});
            }); */
            this.selectedCupos.push(...selected);
        }
        
        //console.log(day, this.selectedCupos);
        this.cupoUpdateEvent.next(this.selectedCupos);
        
        this.changeDetectorRef.detectChanges();
    }

    updateCupoRows(event:MatCheckboxChange, pos: number) {
        
        /* if(!event.checked)
            this.selectedCupos = ArrayUtils.removeDuplicate(this.selectedCupos,'hora','dia', this.cupos[pos][0].hora)  //.filter(e=> e.hora != hora);
        else
            this.selectedCupos.push(...this.cupos[pos]); */
        this.cupoUpdateEvent.next(this.selectedCupos);
        this.changeDetectorRef.detectChanges();
    }


    
    openConfirmationDialog(){
        if(this.buildingFormGroup.invalid || this.selectedCupos.length < 1) return;
        let updatedCupos: CupoSelection[] = this.selectedCupos.filter(elem => elem.cupomaximonuevo !== elem.cupomaximo );
        updatedCupos = ArrayUtils.unique(updatedCupos,'idhorariosentregacuposfecha');
        
        let cupos = '';
        updatedCupos.sort((a, b) => {
            if (a.hora! < b.hora!) return -1;
            if (a.hora! > b.hora!) return 1;
            return 0;
        }).forEach(e=> cupos +='<br>'+e.nomfecha+' '+day_format(`${e.dia}`)+' - Banda: '+e.hora+' hs - '+ ' Cupo Max.: ' + e.cupomaximonuevo);
        const confirmationDialogData: ConfirmationDialogData = {
            title: `Modificar cupos`,
            message: `Esta seguro de que desea modificar los siguientes cupos? ${cupos}`,
            color: 'accent',
            //showObservation: true,
        }
        
        let matDialogRef: MatDialogRef<ConfirmationDialogComponent> = this.matDialog.open(ConfirmationDialogComponent, {
            width: "650px",
            data: confirmationDialogData
        });
        
        matDialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean | string) => {
            
            if (result) {
                this.overlayService.displayLoadingOverlay();
                this.loading = true;
                //const fn =() => (this.disponibilizar) ?  this.sucursalService.updateCupoCalendar : this.sucursalService.reserveCupo
                /* this.appartmentService.updateSucursalesCupos(updatedCupos)
                .pipe(take(1))
                .subscribe({
                    next: (result: UpdateResponse) => {
                        
                        let msg = 'No se registraron cambios para los cupos seleccionados';
                        if (result) {
                            this.getCuposSucursal(result.error);
                            msg = `Se modificaron correctamente los cupos: ${result.ok.join(', ')}`;
                        }
                        this.snackBarService.open(msg, "Aceptar", 6000, "success-snackbar");
                    },
                    error: (e: HttpErrorResponse) => console.error(e),
                    complete: () => {
                        this.overlayService.hideLoadingOverlay();
                        this.loading = false;
                    }
                }); */
            }
        });
    }
    
}

