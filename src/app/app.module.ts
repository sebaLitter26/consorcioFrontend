import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from './modules/overlay/overlay.module';
import { GraphQLModule } from './graphql.module';
import { RoutesCommonModule } from './modules/common/routes-common.module';
import { DashboardCardModule } from './modules/ui/dashboard-card/dashboard-card.module';
import { DynamicTableModule } from './modules/ui/dynamic-table/dynamic-table.module';
import { CoolFileInputModule } from './modules/ui/cool-file-input/cool-file-input.module';
import { LoadersModule } from './modules/ui/loaders/loaders.module';
import { CoolInputModule } from './modules/ui/cool-input/cool-input.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        GraphQLModule,
        RoutesCommonModule,
        //HttpClientModule,
        OverlayModule,   
        DashboardCardModule,
        DynamicTableModule,     
        CoolFileInputModule,
        LoadersModule,
        CoolInputModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
