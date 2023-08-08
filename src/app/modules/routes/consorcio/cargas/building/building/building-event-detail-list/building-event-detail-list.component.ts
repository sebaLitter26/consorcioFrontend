import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DynamicTableDefinition } from 'src/app/modules/ui/dynamic-table';
import { Building, BuildingDetail, BuildingEvent, BuildingFlow, BuildingSerial, BuildingStateStyle } from '../..';
import { BuildingActionsComponent } from '../../building-list/building-actions/building-actions.component';
import { BUILDING_SERIAL_STATE_MAP, BUILDING_STATE_ENUM_MAP, BUILDING_STATE_MAP } from '../../model';

/**
 * Componente para mostrar los detalles del conteo en una expandable row
 */
@Component({
  selector: 'app-building-event-detail-list',
  templateUrl: './building-event-detail-list.component.html',
  styleUrls: ['./building-event-detail-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingEventsListComponent implements OnInit {
   
  /** El detalle de conteo.*/
  @Input()
  data: Observable<BuildingDetail> = of();

  /** Los eventos del conteo a mostrar en la dynamic table */
  events: BuildingEvent[] = [];

  fetching: boolean = true;

  /** Definicion de las columnas de la tabla de Eventos */
  tableDefinitionEvents: DynamicTableDefinition = {
    displayedColumns: ["estado", "fecha", "usuario"],
    headerCellDefinitions: ["Estado", "Fecha", "Usuarios"],
  }

  /** Formatos custom para columnas del listado de eventos. */
  columnFormatersEvents: (((item: any) => string | number | boolean) | null)[] = [
    (item: BuildingEvent) => {
      return BUILDING_STATE_MAP[BUILDING_STATE_ENUM_MAP[item.estado]].label;
    },
    (item: BuildingEvent) => {
      let date = new Date(item.fecha);
      return `${date.toLocaleDateString() + '\n' + date.toLocaleTimeString()}` ?? '-';
    },
    null,
  ];

  /** Estilos custom para columnas del listado de eventos. */
  columnStylesEvents: (((item: BuildingEvent) => {[key: string]: string}) | null)[] = [
    (item: BuildingEvent) => {
        const buildingStateStyle: BuildingStateStyle = BUILDING_STATE_MAP[BUILDING_STATE_ENUM_MAP[item.estado]];
        return {
            "color": buildingStateStyle.color,
            "padding": "5px 15px",
            "box-sizing": "border-box",
            "width": "100px",
            "border-radius": "5px",
            "background-color": buildingStateStyle.backgroundColor,
        }
    },
    null, null,
  ];
  
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.data.subscribe({
        next: (buildingDetails: BuildingDetail) => {
          this.events = buildingDetails.flujo.map((buildingFlow: BuildingFlow) => {
            return <BuildingEvent>{
              estado: buildingFlow.estado,
              fecha: buildingFlow.fecha,
              usuario: buildingFlow.nombre,
            }
          });
          this.fetching = false;
          this.changeDetectorRef.detectChanges();
          
        }
      });
    }
  }
}
