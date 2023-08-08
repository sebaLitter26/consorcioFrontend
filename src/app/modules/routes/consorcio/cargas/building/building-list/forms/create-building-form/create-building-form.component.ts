
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBuildingPayload, BuildingsListProduct, Building, UpdateBuildingPayload } from '../../..';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingService } from '../../../services/buildings.service';
import { BuildingSharedService } from '../../../services/buildings-shared.service';
import { CoolFile } from '../../../../../../../ui/cool-file-input';

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
    floors: new FormControl(9,{
        nonNullable: true,
        validators: [Validators.required, Validators.pattern("^[0-9]{1,2}$")]
      }),
    letter: new FormControl('',{
        nonNullable: true,
        validators: [Validators.required, Validators.pattern("^[A-Ha-h]{1}$")]
      }),
    images: new FormControl(<string[]>[], {nonNullable: true})
  });
  
  /** El PLU que se encuentra al buscar en el form, si es null no se muestra ese template */
  buildingPlu: BuildingsListProduct | null = null;

  /** Se utiliza para mostrar la spinning wheel mientras carga */
  bFetchingData: boolean = false;

  bSubmitting: boolean = false;

  buildingAction: string = 'Cre';

  floors: Array<number> = [2,3,4,5,6,7,8,9];
  letters: Array<string> = ['A','B','C','D','E'];

  images: string[] = [];

  constructor(
    //private gdmService: GdmService, 
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<CreateBuildingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public building: Building,
    private buildingService: BuildingService,
    private buildingsSharedService: BuildingSharedService,
  ) { 
    
    if(this.building){
        this.images = this.building.images;
      this.buildingAction = 'Modific';
      this.buildingForm.patchValue({
        address: this.building.address,
        location: this.building.location,
        floors: this.building.floors,
        letter: this.building.letter,
        images: this.images
      })
    }
  }


  ngOnInit(): void {


    /** Busca el PLU despues de un tiempo de escribir el input 
    this.buildingForm.get('plu')!.valueChanges.pipe(debounceTime(2000)).subscribe(pluInput => this.showPluDetails(pluInput));
    this.buildingForm.get('plu')!.valueChanges.subscribe(() => { if(this.buildingForm.get('plu')!.dirty) this.bFetchingData = true });
    */
  }

  onSubmit(){
    this.bSubmitting = true;
    let fn =() => this.buildingService.createBuilding
    let payload: CreateBuildingPayload | UpdateBuildingPayload = {
        address: this.buildingForm.controls.address.value,
        location: this.buildingForm.controls.location?.value,
        floors: this.buildingForm.controls.floors?.value,
        letter: this.buildingForm.controls.letter?.value,
        images: this.images
    }
    
    
    if(this.building){
        fn =() => this.buildingService.updateBuilding
        payload = {...payload, id: this.building.id}
        
    }
    
    fn().bind(this.buildingService)(payload).subscribe({
      next: () => {
        this.snackBarService.open(`Se ${this.buildingAction}o el edificio.`, "Aceptar", 6000, "success-snackbar");
        this.buildingsSharedService.updateTable();
        this.dialogRef.close(); 
      },
      
      error: (error) => this.bSubmitting = false,
    });
  }

  /**
   * Envia el formulario al endpoint cuando se da Aceptar en el form
   
  createBuilding(){
    this.bSubmitting = true;
    const payload: CreateBuildingPayload = {
        address: this.buildingForm.controls.address.value,
        location: this.buildingForm.controls.location?.value,
        floors: this.buildingForm.controls.floors?.value,
        letter: this.buildingForm.controls.letter?.value,
        images: this.images.map(elem=> JSON.stringify(elem.cloudinary)),
    }
    console.log(payload);
    this.buildingService.createBuilding(payload).subscribe({
      next: () => {
        this.snackBarService.open(`Se agrego el nuevo edificio.`, "Aceptar", 6000, "success-snackbar");
        this.buildingsSharedService.updateTable();
        this.dialogRef.close(); 
      },
      
      error: (error) => this.bSubmitting = false,
    });
  }
*/
 

  addFile(images:CoolFile[]){
    if(!images) return;
    this.bSubmitting = true;
    const payload: UpdateBuildingPayload = {
      id: this.building.id,
      address: this.building.address,
      location: this.building.location,
      floors: this.building.floors,
      letter: this.building.letter,
      images: (images) ? images.map(elem=> JSON.stringify(elem.cloudinary)) : []
    }
    
    this.buildingService.updateBuilding(payload).subscribe({
      next: (data:Building) => {
        
        
        this.images = [...data.images],
        
        this.snackBarService.open(`Se modificaron las fotos del edificio.`, "Aceptar", 6000, "success-snackbar");
        this.bSubmitting = false;
        this.buildingsSharedService.updateTable();
      },
      
      error: (error) => {
            this.bSubmitting = false;
            this.snackBarService.open(`ERROR: ${error}`, "Aceptar", 6000, "error-snackbar");
        }
    });
    
    /* this.images.push(...event);
    const sources = this.images.map(elem=> JSON.stringify(elem.cloudinary)); */
    //this.buildingForm.controls.images.setValue(sources);
    
}

  /**
   * [NO FUNCIONA] Un validator para ver si se encontro el plu buscado
   * Es valido buildingPlu no es null
   * @returns ValidatorFn para verificar que el formControl plu sea valido
  
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
   
   showPluDetails(plu: string){
    this.bFetchingData = false;
    if(plu === null) {
      this.buildingPlu = null; 
      return;
    }
    */
    // Si gdmService no encuentra el plu devuelve un undefined object, no devuelve un error
    /* this.gdmService.getPluInformation(plu).subscribe(pluObject => {
      if(pluObject !== undefined){
        this.buildingPlu = {plu: plu, descripcion: pluObject.descripcion, imagen: PluUtils.buildPluImageUrl(plu)};
      }
      else {
        this.snackBarService.open("PLU no encontrado", "Aceptar", 5000, "error-snackbar");
        this.buildingPlu = null; 
      } 
    }) 
  }

  resetPluControl(){
    if(this.buildingForm.get('plu')!.dirty) {
      this.buildingPlu = null;
      this.buildingForm.get('plu')!.reset();
    }
  }
  */
}
