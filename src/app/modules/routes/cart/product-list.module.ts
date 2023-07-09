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
import { CartService } from './services/cart.service'; 
import { LoadersModule } from "../../ui/loaders/loaders.module";
import { DashboardCardModule } from '../../ui/dashboard-card/dashboard-card.module';
import { ProductDetailResolver } from './resolver/product-detail-resolver';
import { UserModule } from '../user/user.module';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderHistoricComponent } from './orders/orders-history.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';

const routes: Routes = [
    {
        path: 'product-list',
        component: ProductListComponent,
        //resolve: {empleadoDetail: ProductDetailResolver},
        data: { animation: 'isRight' } 
    },
    {
        path: 'order-history',
        component: OrderHistoricComponent,
        data: { animation: 'isLeft' } 
    }, 
    {
        path: '*',
        redirectTo: '/cart/product-list',
        pathMatch: 'full'
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
        ProductListComponent, 
        OrderHistoricComponent,
        OrderDetailComponent
    ],
    providers: [
        DatePipe,
        ProductDetailResolver,
        CartService,
    ]
})
export class ProductListModule { }
