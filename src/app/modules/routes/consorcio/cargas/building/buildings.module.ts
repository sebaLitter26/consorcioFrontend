import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuildingListComponent } from "./building-list/buildings-list.component";
import { BuildingService } from "./services/buildings.service";
import { BuildingsResolver } from "./resolver/building-resolver";
import { BuildingsListProductComponent } from './building-list/buildings-list-product/buildings-list-product.component';

import { CreateBuildingFormComponent } from './building-list/forms/create-building-form/create-building-form.component';
import { BuildingActionsComponent } from './building-list/building-actions/building-actions.component';
/* import { GdmModule } from '../../gdm/gdm.module';
import { GdmService } from '../../gdm/services/gdm.service';
import { NoveltiesService } from '../novelties/services/novelties.service'; */
import { BuildingSharedService } from './services/buildings-shared.service';
import { BuildingsListFiltersComponent } from './building-list/buildings-list-filters/buildings-list-filters.component';
import { BuildingDetailComponent } from './building/building-detail.component';
import { BuildingDetailResolver } from './resolver/building-detail-resolver';
import {BuildingSerialsListComponent } from './building/building-serial-detail-list/building-serial-detail-list.component';
import {BuildingEventsListComponent } from './building/building-event-detail-list/building-event-detail-list.component';
import { DashboardCardModule } from 'src/app/modules/ui/dashboard-card/dashboard-card.module';
import { DynamicTableModule } from 'src/app/modules/ui/dynamic-table/dynamic-table.module';
import { LoadersModule } from 'src/app/modules/ui/loaders/loaders.module';
import { CoolDirectivesModule } from 'src/app/modules/ui/cool-input/cool-directives/cool-directives.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { CoolFileInputModule } from '../../../../ui/cool-file-input/cool-file-input.module';
const routes: Routes = [
    { 
        path: 'buildings-list',
        component: BuildingListComponent,
        //resolve: {Buildings: BuildingsResolver},
        data: { animation: 'isLeft' } 
    },
    { 
        path: 'building',
        component: BuildingDetailComponent,
        resolve: {BuildingDetail: BuildingDetailResolver},
        data: { animation: 'isRight' } 
    },
    {
        path: '',
        redirectTo: 'buildings-list',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DynamicTableModule,
        LoadersModule,
        CoolFileInputModule,
        SharedModule,
        //GdmModule,
        DashboardCardModule,
    ],
    declarations: [
        BuildingListComponent,
        BuildingsListProductComponent,
        CreateBuildingFormComponent,
        BuildingActionsComponent,
        BuildingsListFiltersComponent,
        BuildingDetailComponent,
        BuildingSerialsListComponent,
        BuildingEventsListComponent,
    ],
    providers: [
        BuildingService,
        BuildingsResolver,
        BuildingDetailResolver,
        //GdmService,
        //NoveltiesService,
        BuildingSharedService,
        
    ]
})
export class BuildingsModule{}
