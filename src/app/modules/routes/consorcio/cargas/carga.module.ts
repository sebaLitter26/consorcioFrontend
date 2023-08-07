import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { DynamicTableModule } from '../../../ui/dynamic-table/dynamic-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoolDirectivesModule } from '../../../ui/cool-input/cool-directives/cool-directives.module';
import { CoolInputModule } from '../../../ui/cool-input/cool-input.module';
import { AuthorizationModule } from '../../../authorization/authorization.module';
import { DatePipe } from '@angular/common';
import { ProcessStatusModule } from '../../../process-status/process-status.module';
import { RoutesCommonModule } from '../../../common/routes-common.module';
import { ResourceService } from './../services/resource-control.service'; 
import { LoadersModule } from "../../../ui/loaders/loaders.module";
import { DashboardCardModule } from '../../../ui/dashboard-card/dashboard-card.module';
import { LegajoDetailResolver } from './../resolver/legajo-detail-resolver';
import { CargasComponent } from './cargas.component';
import { UserModule } from '../../user/user.module';
import { ReportComponent } from './../reporte/report.component';
import { EmpleadoInformationComponent } from './../reporte/empleado-detail/empleado-detail.component';
import { CoolFileInputModule } from '../../../ui/cool-file-input/cool-file-input.module';

import { BuildingComponent } from './building/building.component';
import { AppartmentComponent } from './appartment/appartment.component';
import { TenantComponent } from './tenant/tenant.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
    {
        path: '',
        component: CargasComponent,
        //resolve: {empleadoDetail: LegajoDetailResolver},
        children: [
            {
                path: 'building1',
                loadChildren: () => import('./building1/buildings.module').then(m => m.BuildingsModule),
                //resolve: {empleadoDetail: LegajoDetailResolver},
                outlet: 'carga',
                data: { animation: 'isRight' } 
            },
            {
                path: 'building',
                component: BuildingComponent,
                //resolve: {empleadoDetail: LegajoDetailResolver},
                outlet: 'carga',
                data: { animation: 'isRight' } 
            },
            {
                path: 'appartment',
                component: AppartmentComponent,
                //resolve: {empleadoDetail: LegajoDetailResolver},
                outlet: "carga",
                data: { animation: 'isLeft' } 
            },
            {
                path: 'tenant',
                component: TenantComponent,
                //resolve: {empleadoDetail: LegajoDetailResolver},
                outlet: "carga",
                data: { animation: 'isRight' } 
            },
            {
                path: 'owner',
                component: OwnerComponent,
                //resolve: {empleadoDetail: LegajoDetailResolver},
                outlet: "carga",
                data: { animation: 'isLeft' } 
            },

            {
                path: '',
                redirectTo: '/consorcio/cargas/(carga:building1/buildings-list)',
                pathMatch: 'full'
            },
        ]

    },
    
   
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DynamicTableModule,
        ReactiveFormsModule,
        CoolDirectivesModule,
        CoolInputModule,
        AuthorizationModule,
        ProcessStatusModule,
        RoutesCommonModule,
        LoadersModule,
        DashboardCardModule,
        UserModule,
        CoolFileInputModule
    ],
    declarations: [
        
        CargasComponent,
        BuildingComponent,
        AppartmentComponent,
        TenantComponent,
        OwnerComponent
        
    ],
    providers: [
        DatePipe,
        LegajoDetailResolver,
        ResourceService,
    ]
})
export class CargasModule { }
