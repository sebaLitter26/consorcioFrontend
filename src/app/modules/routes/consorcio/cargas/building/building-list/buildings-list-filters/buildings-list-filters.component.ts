import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuildingListFilters, BuildingTypeOption, BuildingStateOption } from '../..';
import { BuildingType, BuildingState } from '../../model';

@Component({
  selector: 'app-buildings-list-filters',
  templateUrl: './buildings-list-filters.component.html',
  styleUrls: ['./buildings-list-filters.component.scss']
})
export class BuildingsListFiltersComponent {
  /** Flag para saber si se seleccionaron todas las opciones en el select multiple de tipos */
  //allBuildingTypesSelected: boolean = false;
  /** Flag para saber si se seleccionaron todas las opciones en el select multiple de estados */
  //allBuildingStatesSelected: boolean = false;
  
  /** Evento que se emite cuando se aplican los filtros (submit del form) */
  @Output()
  onFiltersChanged: EventEmitter<BuildingListFilters> = new EventEmitter<BuildingListFilters>();
  
  /** El form donde ingresar los filtros */
  filtersForm: FormGroup = new FormGroup ({
    location: new FormControl(null),
    address: new FormControl(null),
    floors: new FormControl(9, {validators: [Validators.required, Validators.pattern("^[0-9]{1,2}$")]}),
  });
  floors: Array<number> = [2,3,4,5,6,7,8,9];

  /** Las opciones de tipos de conteos para elegir en el select */
  /* buildingTypeOptions: BuildingTypeOption[] = [
    { 
      value: BuildingType.TODOS_LOS_PLU,
      displayValue: "Todos los PLUs"
    },
    { 
      value: BuildingType.UN_PLU,
      displayValue: "Un PLU"
    },
  ]; */

  /** Las opciones de estados de conteos para elegir en el select */
  /* buildingStateOptions: BuildingStateOption[] = [
    { 
      value: BuildingState.CREADO,
      displayValue: "Creado"
    },
    { 
      value: BuildingState.INFORMADO,
      displayValue: "Informado"
    },
    { 
      value: BuildingState.INICIADO,
      displayValue: "Iniciado"
    },
    { 
      value: BuildingState.PAUSADO,
      displayValue: "Pausado"
    },
    { 
      value: BuildingState.FINALIZADO,
      displayValue: "Finalizado"
    },
    { 
      value: BuildingState.CERRADO_CONFORME,
      displayValue: "Cerrado conforme"
    },
    { 
      value: BuildingState.CERRADO,
      displayValue: "Cerrado"
    },
    { 
      value: BuildingState.CANCELADO,
      displayValue: "Cancelado"
    },

  ]; */
  
  /** Emite el evento para actualizar la tabla de conteos */
  onSubmitFilters(): void {
    let filters: BuildingListFilters = this.filtersForm.value;
    filters.floors = this.filtersForm.value.floors
    filters.address = this.filtersForm.value.address ? this.filtersForm.value.address.toString()  : null;
    filters.location = this.filtersForm.value.location ? this.filtersForm.value.location.toString()  : null;
    this.onFiltersChanged.emit(filters);
  }

  /** Resetea los filters a null o a un array vacio dependiendo el formControl */
  clearFilters(): void {
    this.filtersForm.reset();
    this.filtersForm.get('location')?.setValue(null);
    this.filtersForm.get('address')?.setValue(null);
    this.onFiltersChanged.emit(this.filtersForm.value);
  }

  /**
   * Selecciona o deselecciona todas las opciones de tipos de conteos
   */
  /* setAllBuildingTypeOptions(): void {
    this.allBuildingTypesSelected = !this.allBuildingTypesSelected;
    this.filtersForm.get('tipo_building')?.setValue(this.allBuildingTypesSelected ? ['all', ...this.buildingTypeOptions.map(option => option.value)] : []);
  } */
  
  /**
   * Selecciona o deselecciona todas las opciones de estados de conteos.
   */
  /* setAllBuildingStateOptions(): void {
    this.allBuildingStatesSelected = !this.allBuildingStatesSelected;
    this.filtersForm.get('estado')?.setValue(this.allBuildingStatesSelected ? ['all', ...this.buildingStateOptions.map(option => option.value)] : []);
  } */

  constructor(
  ) { }

}
