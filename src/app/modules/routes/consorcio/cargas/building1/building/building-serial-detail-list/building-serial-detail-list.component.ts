import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DynamicTableDefinition } from 'src/app/modules/ui/dynamic-table';
import { Building, BuildingDetail, BuildingEvent, BuildingFlow, BuildingSerial, BuildingStateStyle } from '../..';
import { BUILDING_SERIAL_STATE_MAP, BUILDING_STATE_ENUM_MAP, BUILDING_STATE_MAP } from '../../model';
import { BuildingActionsComponent } from '../../building-list/building-actions/building-actions.component';

/**
 * Componente para mostrar los detalles del conteo en una expandable row
 */
@Component({
  selector: 'app-building-serial-detail-list',
  templateUrl: './building-serial-detail-list.component.html',
  styleUrls: ['./building-serial-detail-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingSerialsListComponent implements OnInit {

  /** El detalle de conteo.*/
  @Input()
  data: Observable<BuildingDetail> = of();

  /** Los series del conteo a mostrar en la  dynamic table */
  serials: BuildingSerial[] = [];

  fetching: boolean = true;

  /** Definicion de las columnas de la tabla de Series */
  tableDefinitionSerials: DynamicTableDefinition = {
    displayedColumns: ["id_serie", "plu", "estado", "fecha"],
    headerCellDefinitions: ["ID Serie", "PLU", "Estado", "Fecha"],
  }
  
  /** Formatos custom para columnas del listado de series. */
  columnFormatersSerials: (((item: any) => string | number | boolean) | null)[] = [
    null, null,
    (item: BuildingSerial) => {
      return BUILDING_SERIAL_STATE_MAP[item.id_estado].label;
    },
    (item: BuildingSerial) => {
      let date = new Date(item.fecha);
      return `${date.toLocaleDateString() + '\n' + date.toLocaleTimeString()}` ?? '-';
    },
  ];

  /** Estilos custom para columnas del listado de series. */
  columnStylesSerials: (((item: BuildingSerial) => {[key: string]: string}) | null)[] = [
    null, null,
    (item: BuildingSerial) => {
      const BuildingStateStyle: BuildingStateStyle = BUILDING_SERIAL_STATE_MAP[item.id_estado];
      return {
          "color": BuildingStateStyle.color,
          "padding": "5px 15px",
          "box-sizing": "border-box",
          "width": "100px",
          "border-radius": "5px",
          "background-color": BuildingStateStyle.backgroundColor,
      }
    },
  ];
  
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.data) {
        this.data.subscribe({
          next: (BuildingDetails: BuildingDetail) => {
            this.serials = BuildingDetails.series;
            this.fetching = false;
            this.changeDetectorRef.detectChanges();
          }
        });
      }
    }
}
