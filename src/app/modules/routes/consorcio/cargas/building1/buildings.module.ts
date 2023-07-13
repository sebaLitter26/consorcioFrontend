import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared.module";
import { CoolDirectivesModule } from "../../ui/cool-input/cool-directives/cool-directives.module";
import { BuildingsListComponent } from "./buildings-list/buildings-list.component";
import { DynamicTableModule } from "../../ui/dynamic-table/dynamic-table.module";
import { BuildingService } from "./services/buildings.service";
import { LoadersModule } from "../../ui/loaders/loaders.module";
import { BuildingsResolver } from "./resolver/building-resolver";
import { BuildingsListProductComponent } from './buildings-list/buildings-list-product/buildings-list-product.component';
import { PluImageComponent } from "../../common/plu-image/plu-image.component";
import { CreateBuildingFormComponent } from './buildings-list/forms/create-building-form/create-building-form.component';
import { BuildingActionsComponent } from './buildings-list/building-actions/building-actions.component';
import { GdmModule } from '../../gdm/gdm.module';
import { GdmService } from '../../gdm/services/gdm.service';
import { NoveltiesService } from '../novelties/services/novelties.service';
import { BuildingSharedService } from './services/buildings-shared.service';
import { BuildingsListFiltersComponent } from './buildings-list/buildings-list-filters/buildings-list-filters.component';
import { BuildingDetailComponent } from './building/building-detail.component';
import { BuildingDetailResolver } from './resolver/building-detail-resolver';
import {BuildingSerialsListComponent } from './building/building-serial-detail-list/building-serial-detail-list.component';
import {BuildingEventsListComponent } from './building/building-event-detail-list/building-event-detail-list.component';
const routes: Routes = [
    { 
        path: 'buildings-list',
        component: BuildingsListComponent,
        resolve: {Buildings: BuildingsResolver},
        data: { animation: 'isLeft' } 
    },
    { 
        path: 'building',
        component: BuildingDetailComponent,
        resolve: {BuildingDetail: BuildingDetailResolver},
        data: { animation: 'isRight' } 
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        DynamicTableModule,
        LoadersModule,
        CoolDirectivesModule,
        SharedModule,
        ReactiveFormsModule,
        GdmModule,
        DashboardCardModule,
    ],
    declarations: [
        BuildingListComponent,
        BuildingListProductComponent,
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
        GdmService,
        NoveltiesService,
        BuildingSharedService,
    ]
})
export class BuildingsModule{}
