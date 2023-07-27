import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CreateBuildingPayload, BuildingsListProduct } from '../../..';
//import { GdmService } from 'src/app/modules/gdm/services/gdm.service';
import { PluUtils } from 'src/app/utils/plu.utils';
import { BuildingType } from '../../../model';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BuildingService } from '../../../services/buildings.service';
//import { IpService } from 'src/app/services/ip.service';
import { BuildingSharedService } from '../../../services/buildings-shared.service';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
  ? FormGroup<ControlsOf<T[K]>>
  : FormControl<T[K]>;
};

/**
 * Componente para manejar el form de crear un nuevo conteo
 */
@Component({
  selector: 'app-create-building-form',
  templateUrl: './create-building-form.component.html',
  styleUrls: ['./create-building-form.component.scss']
})
export class CreateBuildingFormComponent implements OnInit {
  /** El form para crear un conteo nuevo */
  buildingForm = new FormGroup<ControlsOf<CreateBuildingPayload>> ({
    /** `FormControl` con el tipo de legajo a filtrar. */
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    location: new FormControl('',{
        nonNullable: true,
        validators: [Validators.required]
      }),
    floors: new FormControl(1,{
        nonNullable: true,
        validators: [Validators.required]
      }),
    letter: new FormControl('',{
        nonNullable: true,
        validators: [Validators.required]
      }),
    image: new FormControl(null)
  });
  
  /** El PLU que se encuentra al buscar en el form, si es null no se muestra ese template */
  buildingPlu: BuildingsListProduct | null = null;

  /** Se utiliza para mostrar la spinning wheel mientras carga */
  bFetchingData: boolean = false;

  bSubmitting: boolean = false;

  floors: Array<number> = [2,3,4,5,6,7,8,9];
  letters: Array<string> = ['A','B','C','D','E'];

  constructor(
    //private gdmService: GdmService, 
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<CreateBuildingFormComponent>,
    private buildingService: BuildingService,
    private buildingsSharedService: BuildingSharedService,
  ) { }


  ngOnInit(): void {
    

    /** Busca el PLU despues de un tiempo de escribir el input 
    this.buildingForm.get('plu')!.valueChanges.pipe(debounceTime(2000)).subscribe(pluInput => this.showPluDetails(pluInput));
    this.buildingForm.get('plu')!.valueChanges.subscribe(() => { if(this.buildingForm.get('plu')!.dirty) this.bFetchingData = true });
    */
  }

  /**
   * Envia el formulario al endpoint cuando se da Aceptar en el form
   */
  createBuilding(){
    this.bSubmitting = true;
    const payload: CreateBuildingPayload = {
        address: this.buildingForm.controls.address.value,
        location: this.buildingForm.controls.location?.value,
        floors: this.buildingForm.controls.floors?.value,
        letter: this.buildingForm.controls.letter?.value,
        image: this.buildingForm.controls.image?.value,
    }
    
    this.buildingService.createBuilding(payload).subscribe({
      next: () => {
        this.snackBarService.open(`Se agrego el nuevo edificio.`, "Aceptar", 6000, "success-snackbar");
        this.buildingsSharedService.updateTable();
        this.dialogRef.close(); 
      },
      
      error: (error) => this.bSubmitting = false,
    });
  }

  addFile(event:any){
    console.log(event);
    this.buildingForm.controls.image.setValue(event);
    
}

  /**
   * [NO FUNCIONA] Un validator para ver si se encontro el plu buscado
   * Es valido buildingPlu no es null
   * @returns ValidatorFn para verificar que el formControl plu sea valido
   */
  pluValidator(plu: BuildingsListProduct | null): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
      if(plu != null){
        return null;
      }
      else return {'pluInvalido': control.value}
    }
  }

  isSubmitButtonDisabled(): boolean {
    let enabled = (Number(this.buildingForm.get('tipo_building')!.value) == BuildingType.TODOS_LOS_PLU || this.buildingPlu !== null)
      && !this.bFetchingData;
    return !enabled;
  }

  /**
   * Busca el plu solicitado, si es valido se lo asigna a buildingPlu y se muestra, si no encuentra el plu muestra un error
   * @param plu El plu a buscar, ingresado en el input
   */
   showPluDetails(plu: string){
    this.bFetchingData = false;
    if(plu === null) {
      this.buildingPlu = null; 
      return;
    }
    
    // Si gdmService no encuentra el plu devuelve un undefined object, no devuelve un error
    /* this.gdmService.getPluInformation(plu).subscribe(pluObject => {
      if(pluObject !== undefined){
        this.buildingPlu = {plu: plu, descripcion: pluObject.descripcion, imagen: PluUtils.buildPluImageUrl(plu)};
      }
      else {
        this.snackBarService.open("PLU no encontrado", "Aceptar", 5000, "error-snackbar");
        this.buildingPlu = null; 
      } 
    }) */
  }

  resetPluControl(){
    if(this.buildingForm.get('plu')!.dirty) {
      this.buildingPlu = null;
      this.buildingForm.get('plu')!.reset();
    }
  }
}
