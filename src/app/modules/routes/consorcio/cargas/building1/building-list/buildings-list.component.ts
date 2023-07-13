import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicTableDefinition, ItemDetailComponent } from 'src/app/modules/ui/dynamic-table';
import { Building, BuildingListFilters, BuildingStateOption, BuildingStateStyle, BuildingTypeOption } from '..';
import { BuildingService } from '../services/buildings.service';
import { buildingsListProductComponent } from './buildings-list-product/buildings-list-product.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatebuildingFormComponent } from './forms/create-building-form/create-building-form.component';
import { BuildingActionsComponent } from './building-actions/building-actions.component';
import { BuildingState, BuildingType, BUILDING_STATE_MAP } from '../model';
import { filter, Subject } from 'rxjs';
import { BuildingSharedService } from '../services/buildings-shared.service';
import { OverlayService } from 'src/app/modules/overlay/services/overlay.service';

@Component({
  selector: 'app-buildings-list',
  templateUrl: './buildings-list.component.html',
  styleUrls: ['./buildings-list.component.scss']
})
export class BuildingsListComponent implements OnInit {
  /** Los conteos que se muestran en la lista */
  buildings: Building[]= [];

  filters: BuildingListFilters = {
    tipoConteo: [],
    fechaDesde: null,
    fechaHasta: null,
    estado: [],
    idConteo: null,
    plu: null,
    usuario: null,
  }
 
  /** Se utiliza para mostrar el app-table-loader mientras carga */
  loading: boolean = true;

  /** La definición de la tabla que muestra el listado de conteos. */
  tableDefinition: DynamicTableDefinition = {
    displayedColumns: ["id_conteo", "tipo_Conteo", "id_estado", "plu", "fecha_creacion", "nombre", "acciones"],
    headerCellDefinitions: ["ID Conteo", "Tipo", "Estado", "PLU", "Fecha y hora de creacion", "Usuario", ""],
  }
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private buildingService: BuildingService, 
    private matDialog: MatDialog,
    private buildingsSharedService: BuildingsSharedService,
    private overlayService: OverlayService,
  ) {}
  
  /** Componentes custom a usar en el listado de conteos. */
  customComponents: (Type<any> | null)[] = [null, null, null, null, null, null, BuildingActionsComponent];
  
  /** Formatos custom para columnas del listado de conteos. */
  columnFormaters: (((item: any) => string | number | boolean) | null)[] = [
    null, null,       
    (item: Building) => {
      return BUILDING_STATE_MAP[item.id_estado].label;
    },
    (item: Building) => {
      return item.plu ?? '-';
    },
    (item: Building) => {
      let date = new Date(item.fecha);
      return `${date.toLocaleDateString() + '\n' + date.toLocaleTimeString()}` ?? '-';
    },
    null, null,
  ];

  /** Estilos custom para columnas del listado de conteos. */
  columnStyles: (((item: Building) => {[key: string]: string}) | null)[] = [
    null, null,
    (item: Building) => {
        const buildingStateStyle: BuildingStateStyle = BUILDING_STATE_MAP[item.id_estado];
        return {
            "color": buildingStateStyle.color,
            "padding": "5px 15px",
            "box-sizing": "border-box",
            "width": "100px",
            "border-radius": "5px",
            "background-color": buildingStateStyle.backgroundColor,
        }
    }, null, null, null, null
  ];
 
  buildingsUpdateSource: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    /** Obtiene la lista de conteos precargada por el resolver */
    this.loading = true;
    this.activatedRoute.data.subscribe(data => {
      this.buildings = data.buildings;
      this.loading = false;
    });

    this.buildingSharedService.updateBuildingsEvent.subscribe((update: boolean) => {
      this.updateTable();
    });
  }
  
  onFiltersChanged(filters: BuildingListFilters) {
    console.log(filters);
    this.filters = filters;
    this.updateTable();
  }

  /**
   * Actualiza la tabla con los filtros seleccionados
   */
  updateTable() {
    this.overlayService.displayLoadingOverlay();
    this.buildingService.getBuildings(this.filters).subscribe(buildings => {
      this.buildings = buildings;

      setTimeout(() => {
        this.buildingsUpdateSource.next(true);
      }, 100);

      this.overlayService.hideLoadingOverlay();
    });
  }

  /** Abre el form para crear un conteo nuevo */
  openDialogCreatebuilding(){
    this.matDialog.open(CreatebuildingFormComponent);
  }
}
