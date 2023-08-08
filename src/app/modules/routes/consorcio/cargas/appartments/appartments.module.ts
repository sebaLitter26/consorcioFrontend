import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../../shared.module";
import { LoadersModule } from "../../../../ui/loaders/loaders.module";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AppartmentsListComponent } from "./appartments-list/appartments-list.component";
import { CupoComponent } from "./cupo-registry/cupo-registry.component";
import { SucursalService } from "./services/sucursal.service";
import { CupoHistoricComponent } from "./cupo-historico/historic.component";
import { CupoInformationComponent } from "./cupo-historico/cupo-detail/cupo-detail.component";
import { DynamicTableModule } from "../../../../ui/dynamic-table/dynamic-table.module";
import { DatePipe } from '@angular/common';
import { RoutesCommonModule } from "../../../../common/routes-common.module";
import { AppartmentComponent } from "./appartment/appartment.component";

const routes: Routes = [

    {
        path: 'cupo-report',
        component: CupoHistoricComponent,
        data: { animation: 'isLeft' } 
    },
    {
        path: 'appartments-list',
        component: AppartmentsListComponent,
    },
    {
        path: '',
        redirectTo: 'appartments-list',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        LoadersModule,
        SharedModule,
        ReactiveFormsModule,
        DynamicTableModule,
        NgxMaskDirective, NgxMaskPipe,
        RoutesCommonModule,
    ],
    declarations: [
        AppartmentsListComponent,
        CupoComponent,
        CupoHistoricComponent,
        CupoInformationComponent,
        AppartmentComponent
    ],
    providers: [
        SucursalService,
        DatePipe
    ],
})
export class AppartmentsModule {}