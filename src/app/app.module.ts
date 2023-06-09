import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from './modules/overlay/overlay.module';
import { GraphQLModule } from './graphql.module';


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
        //HttpClientModule,
        OverlayModule,        
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
