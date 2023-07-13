import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BuildingListFilters, BuildingTypeOption, BuildingStateOption } from '../..';
import { BuildingType, BuildingState } from '../../model';

@Component({
  selector: 'app-buildings-list-filters',
  templateUrl: './buildings-list-filters.component.html',
  styleUrls: ['./buildings-list-filters.component.scss']
})
export class buildingsListFiltersComponent {
  /** Flag para saber si se seleccionaron todas las opciones en el select multiple de tipos */
  allBuildingTypesSelected: boolean = false;
  /** Flag para saber si se seleccionaron todas las opciones en el select multiple de estados */
  allbuildingStatesSelected: boolean = false;
  
  /** Evento que se emite cuando se aplican los filtros (submit del form) */
  @Output()
  onFiltersChanged: EventEmitter<BuildingListFilters> = new EventEmitter<BuildingListFilters>();
  
  /** El form donde ingresar los filtros */
  filtersForm: FormGroup = new FormGroup ({
    tipoConteo: new FormControl([]),
    fechaDesde: new FormControl(null),
    fechaHasta: new FormControl(null),
    estado: new FormControl([]),
    idConteo: new FormControl(null),
    plu: new FormControl(null),
    usuario: new FormControl(null),
  });

  /** Las opciones de tipos de conteos para elegir en el select */
  buildingTypeOptions: BuildingTypeOption[] = [
    { 
      value: BuildingType.TODOS_LOS_PLU,
      displayValue: "Todos los PLUs"
    },
    { 
      value: BuildingType.UN_PLU,
      displayValue: "Un PLU"
    },
  ];

  /** Las opciones de estados de conteos para elegir en el select */
  buildingStateOptions: BuildingStateOption[] = [
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

  ];
  
  /** Emite el evento para actualizar la tabla de conteos */
  onSubmitFilters(): void {
    let filters: BuildingListFilters = this.filtersForm.value;
    filters.tipoConteo = this.filtersForm.value.tipoConteo.filter((item: string | BuildingTypeOption) => item != 'all');
    filters.estado = this.filtersForm.value.estado.filter((item: string | BuildingStateOption) => item != 'all');
    filters.plu = this.filtersForm.value.plu ? this.filtersForm.value.plu.toString()  : null;
    this.onFiltersChanged.emit(filters);
  }

  /** Resetea los filters a null o a un array vacio dependiendo el formControl */
  clearFilters(): void {
    this.filtersForm.reset();
    this.filtersForm.get('tipoConteo')?.setValue([]);
    this.filtersForm.get('estado')?.setValue([]);
    this.onFiltersChanged.emit(this.filtersForm.value);
  }

  /**
   * Selecciona o deselecciona todas las opciones de tipos de conteos
   */
  setAllBuildingTypeOptions(): void {
    this.allBuildingTypesSelected = !this.allBuildingTypesSelected;
    this.filtersForm.get('tipoConteo')?.setValue(this.allBuildingTypesSelected ? ['all', ...this.buildingTypeOptions.map(option => option.value)] : []);
  }
  
  /**
   * Selecciona o deselecciona todas las opciones de estados de conteos.
   */
  setAllbuildingStateOptions(): void {
    this.allbuildingStatesSelected = !this.allbuildingStatesSelected;
    this.filtersForm.get('estado')?.setValue(this.allbuildingStatesSelected ? ['all', ...this.buildingStateOptions.map(option => option.value)] : []);
  }

  constructor(
  ) { }

}
