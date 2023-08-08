import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { DynamicTableModule } from '../../ui/dynamic-table/dynamic-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoolDirectivesModule } from '../../ui/cool-input/cool-directives/cool-directives.module';
import { CoolInputModule } from '../../ui/cool-input/cool-input.module';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { DatePipe } from '@angular/common';
import { ProcessStatusModule } from '../../process-status/process-status.module';
import { RoutesCommonModule } from '../../common/routes-common.module';
import { ResourceService } from './services/resource-control.service'; 
import { LoadersModule } from "../../ui/loaders/loaders.module";
import { DashboardCardModule } from '../../ui/dashboard-card/dashboard-card.module';
import { LegajoDetailResolver } from './resolver/legajo-detail-resolver';
import { CargasComponent } from './cargas/cargas.component';
import { UserModule } from '../user/user.module';
import { ReportComponent } from './reporte/report.component';
import { EmpleadoInformationComponent } from './reporte/empleado-detail/empleado-detail.component';
import { CoolFileInputModule } from '../../ui/cool-file-input/cool-file-input.module';
import { AuthorizationGuard } from '../../authorization/guards/authorization-guard.service';

const routes: Routes = [
    {
        path: 'cargas',
        loadChildren: () => import('./cargas/carga.module').then(m => m.CargasModule),
        canActivate: [ AuthorizationGuard ],
        //component: CargasComponent,
        //resolve: {empleadoDetail: LegajoDetailResolver},
        data: { animation: 'isRight' } 
    },
    {
        path: 'report',
        component: ReportComponent,
        data: { animation: 'isLeft' } 
    }, 
    {
        path: '**',
        redirectTo: 'cargas',
        pathMatch: 'full'
    },
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DynamicTableModule,
        CoolInputModule,
        AuthorizationModule,
        RoutesCommonModule,
        LoadersModule,
        DashboardCardModule,
        UserModule,
        
    ],
    declarations: [
        //CargasComponent, 
        ReportComponent,
        EmpleadoInformationComponent
        
    ],
    providers: [
        DatePipe,
        LegajoDetailResolver,
        ResourceService,
    ]
})
export class ConsorcioModule { }
