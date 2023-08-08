import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicTableDefinition, ItemDetailComponent } from 'src/app/modules/ui/dynamic-table';
import { Building, BuildingListFilters, BuildingStateOption, BuildingStateStyle, BuildingTypeOption } from '..';
import { BuildingService } from '../services/buildings.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBuildingFormComponent } from './forms/create-building-form/create-building-form.component';
import { BuildingActionsComponent } from './building-actions/building-actions.component';
import { BuildingState, BuildingType, BUILDING_STATE_MAP } from '../model';
import { filter, Observable, Subject } from 'rxjs';
import { BuildingSharedService } from '../services/buildings-shared.service';
import { OverlayService } from 'src/app/modules/overlay/services/overlay.service';
import { PluImageComponent } from '../../../../../common/plu-image/plu-image.component';
import { DynamicComponent } from '../../../../../ui/dynamic-table';
import { StringSplitterData } from '../../../../../common';

@Component({
  selector: 'app-buildings-list',
  templateUrl: './buildings-list.component.html',
  styleUrls: ['./buildings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingListComponent implements OnInit {
  /** Los buildings que se muestran en la lista */
  //buildings: Building[]= [];

  filters: BuildingListFilters = {
    address: null,
    floors: null,
    location: null
  }

  building$: Observable<Building[]> = this.buildingService.getBuildings(this.filters)
 
  /** Se utiliza para mostrar el app-table-loader mientras carga */
  loading: boolean = false;

  /** La definición de la tabla que muestra el listado de buildings. */
  tableDefinition: DynamicTableDefinition = {
    displayedColumns: ["images","address", "location", "floors", "letter", "acciones"],
    headerCellDefinitions: ["","Direccion", "Localidad", "Pisos", "Letra maxima", "Acciones"],
  }
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private buildingService: BuildingService, 
    private matDialog: MatDialog,
    private buildingSharedService: BuildingSharedService,
    private changeDetectorRef: ChangeDetectorRef,
    private overlayService: OverlayService,
  ) {}
  
  /** Componentes custom a usar en el listado de buildings. */
  customComponents: (DynamicComponent | null)[] = [
    {
        type: PluImageComponent,
        componentData: <StringSplitterData>{
            propertyPath: 'images',
        },
    },
    null, null, null, null, 
    {
      type: BuildingActionsComponent,
      componentData: <StringSplitterData>{
          propertyPath: 'images',
      },
  }];
  
  /** Formatos custom para columnas del listado de buildings. */
  columnFormaters: (((item: any) => string | number | boolean) | null)[] = [
    null, null,       
    /* (item: Building) => {
      return BUILDING_STATE_MAP[item.id_estado].label;
    },
    (item: Building) => {
      return item.plu ?? '-';
    },
    (item: Building) => {
      let date = new Date(item.fecha);
      return `${date.toLocaleDateString() + '\n' + date.toLocaleTimeString()}` ?? '-';
    }, */
    null, null,
  ];

  /** Estilos custom para columnas del listado de buildings. */
  columnStyles: (((item: Building) => {[key: string]: string}) | null)[] = [
    null, null,
    /* (item: Building) => {
        const buildingStateStyle: BuildingStateStyle = BUILDING_STATE_MAP[item.id_estado];
        return {
            "color": buildingStateStyle.color,
            "padding": "5px 15px",
            "box-sizing": "border-box",
            "width": "100px",
            "border-radius": "5px",
            "background-color": buildingStateStyle.backgroundColor,
        }
    }, */ null, null, null, null
  ];
 
  buildingsUpdateSource: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    /** Obtiene la lista de buildings precargada por el resolver */
    this.loading = true;
    this.activatedRoute.data.subscribe(data => {
      //this.buildings = data.buildings;
      this.loading = false;
    });

    this.buildingSharedService.updateBuildingEvent.subscribe((update: boolean) => {
        
        
      this.updateTable();
    });
  }
  
  onFiltersChanged(filters: BuildingListFilters) {
    console.log(filters);
    this.filters = filters;
    //this.updateTable();
  }

    /**
         * Función que maneja la recepción de data filtrada en la tabla.
         */
    handleFilteredData($event: any): void {
        /* console.log($event);
        setTimeout(() => {
            this.overlayService.hideLoadingOverlay();
            this.loading = false;
            this.buildingsUpdateSource.next(true);
            this.changeDetectorRef.detectChanges();
          }, 100); */
        
    }

  /**
   * Actualiza la tabla con los filtros seleccionados
   */
  updateTable() {
    /* this.overlayService.displayLoadingOverlay();
    this.loading = true; */
    this.building$ = this.buildingService.getBuildings(this.filters)
    /* .subscribe((buildings: Building[]) => {
        
        
        //this.buildings = buildings;

        setTimeout(() => {
          this.overlayService.hideLoadingOverlay();
          this.loading = false;
          this.buildingsUpdateSource.next(true);
          this.changeDetectorRef.detectChanges();
        }, 100);

        
    }); */
  }

  /** Abre el form para crear un building nuevo */
  openDialogCreatebuilding(){
    this.matDialog.open(CreateBuildingFormComponent);
  }
}
