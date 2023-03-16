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
import { RRHHControlService } from './services/rrhh-control.service'; 
import { LoadersModule } from "../../ui/loaders/loaders.module";
import { DashboardCardModule } from '../../ui/dashboard-card/dashboard-card.module';
import { LegajoDetailResolver } from './resolver/legajo-detail-resolver';
import { LoadPsicoComponent } from './carga-psicotecnico/web.component';
import { UserModule } from '../user/user.module';
import { EmployeeHistoricComponent } from './historico-empleados/historic.component';
import { EmpleadoInformationComponent } from './historico-empleados/empleado-detail/empleado-detail.component';

const routes: Routes = [
    {
        path: 'carga-psicotecnico',
        component: LoadPsicoComponent,
        //resolve: {empleadoDetail: LegajoDetailResolver},
        data: { animation: 'isRight' } 
    },
    {
        path: 'employee-report',
        component: EmployeeHistoricComponent,
        data: { animation: 'isLeft' } 
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
    ],
    declarations: [
        LoadPsicoComponent, 
        EmployeeHistoricComponent,
        EmpleadoInformationComponent
    ],
    providers: [
        DatePipe,
        LegajoDetailResolver,
        RRHHControlService,
    ]
})
export class ResourcesModule { }
