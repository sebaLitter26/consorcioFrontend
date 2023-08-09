import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../../shared.module";
import { LoadersModule } from "../../../../ui/loaders/loaders.module";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AppartmentsListComponent } from "./appartments-list/appartment-list.component";
import { CupoHistoricComponent } from "./cupo-historico/historic.component";
import { CupoInformationComponent } from "./cupo-historico/cupo-detail/cupo-detail.component";
import { DynamicTableModule } from "../../../../ui/dynamic-table/dynamic-table.module";
import { DatePipe } from '@angular/common';
import { RoutesCommonModule } from "../../../../common/routes-common.module";
import { AppartmentComponent } from "./appartment/appartment.component";
import { AppartmentSharedService } from "./services/appartment-shared.service";
import { AppartmentService } from "./services/appartment.service";

const routes: Routes = [

    {
        path: 'cupo-report',
        component: CupoHistoricComponent,
        data: { animation: 'isLeft' } 
    },
    {
        path: 'appartment-list',
        component: AppartmentsListComponent,
    },
    {
        path: '',
        redirectTo: 'appartment-list',
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
        AppartmentComponent,
        CupoHistoricComponent,
        CupoInformationComponent,
        AppartmentComponent
    ],
    providers: [
        AppartmentService,
        AppartmentSharedService,
        DatePipe
    ],
})
export class AppartmentsModule {}