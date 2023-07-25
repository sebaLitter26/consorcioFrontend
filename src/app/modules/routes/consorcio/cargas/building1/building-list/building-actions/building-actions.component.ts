import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/modules/ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CustomCellComponent } from 'src/app/modules/ui/dynamic-table';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Building, BuildingAction } from '../..';
import { BuildingService } from '../../services/buildings.service';
import { BuildingState } from '../../model';
import { BuildingSharedService } from '../../services/buildings-shared.service';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-actions',
  templateUrl: './building-actions.component.html',
  styleUrls: ['./building-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingActionsComponent implements CustomCellComponent, OnInit {
  /** Es asginada por la dynamic table */
  data: Building | null = null;

  /** Las acciones posibles que se pueden realizar de ese building segun su estado */
  actions: BuildingAction[] = [];
  constructor(
    private matDialog: MatDialog,
    private buildingService: BuildingService,
    private snackBarService: SnackBarService,
    private BuildingSharedService: BuildingSharedService,
    private profileService: ProfileService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.actions = this.getBuildingActions(this.data!.id).filter(action => this.userHasPermissionForAction(action))
  }

  /**
   * Realiza la accion clickeada en el menu de acciones del building y avisa para que se actualice la tabla
   * @param action La accion a realizar
   */
  handleAction(action: BuildingAction){
    
    switch(action.name)
    {
      case('detalle'):{
        this.router.navigate(['/buildings/building'], {queryParams: {id: this.data?.id}} );
        break;
      }
      case('informar'):{
        const confirmationDialogData: ConfirmationDialogData = {
          title: 'Informar Edificio',
          message: 'Esta seguro que desea crear el edificio?',
          color: 'primary',
        }
        this.matDialog.open(ConfirmationDialogComponent, {
          width: "300px",
          data: confirmationDialogData
        }).afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            this.buildingService.informBuilding(this.data!.id_building).subscribe(() => {
              this.snackBarService.open(`Edificio ${this.data!.id_building} informado`, "Aceptar", 5000, "success-snackbar");
              this.BuildingSharedService.updateTable();
            });
          }
        })
        break;
      }
      
      case('cancelar'):{
        const confirmationDialogData: ConfirmationDialogData = {
          title: 'Cancelar building',
          message: 'Se cancelará el building ' + this.data?.id_building + ' ¿Desea continuar?',
          color: 'primary',
        }
        this.matDialog.open(ConfirmationDialogComponent, {
          width: "300px",
          data: confirmationDialogData
        })
        .afterClosed().subscribe((result: boolean | string) => {
          if (result) {
            this.buildingService.cancelBuilding(this.data!.id_building).subscribe(() => {
              this.snackBarService.open(`building ${this.data!.id_building} cancelado`, "Aceptar", 5000, "success-snackbar");
              this.BuildingSharedService.updateTable();
            });
          }
        });
        break;
      }
      default:{}
    }
  }

  /**
   * Devuelve todas las acciones que se pueden realizar para un building
   */
  private getAllBuildingActions(): BuildingAction[]{
    const actions: BuildingAction[] = [
      {name: 'detalle', title: 'Ver detalle', icon: 'info', permission: 'buildings_ver-detalle', availableStates: []},
        {name: 'informar', title: 'Informar building', icon: 'announcement', permission: 'buildings_informar-building', 
          availableStates: [BuildingState.CREADO]},
        {name: 'cancelar', title: 'Cancelar building', icon: 'cancel', color: '#F08080',  permission: 'buildings_cancelar-building',
          availableStates: []},
    ];
    return actions;
  }
  
  /**
   * Devuelve la lista de acciones que pueden realizarse para ese building
   * @param state 
   * @returns Una lista de acciones
   */
  getBuildingActions(state: BuildingState): BuildingAction[]{
    return this.getAllBuildingActions().filter(a => a.availableStates?.length==0 || a.availableStates!.includes(state));
  }

  userHasPermissionForAction(action: BuildingAction): boolean {
    return action.permission ? this.profileService.hasPermission(action.permission) : true;
  }
}
