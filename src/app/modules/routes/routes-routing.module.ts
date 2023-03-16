import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationModule } from "../authorization/authorization.module";
import { AuthorizationGuard } from "../authorization/guards/authorization-guard.service";

const routes: Routes = [

    {
        path: 'consorcio',
        loadChildren: () => import('./consorcio/consorcio.module').then(m => m.ConsorcioModule),
        //canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'recursos',
        loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'development',
        loadChildren: () => import('./development/development.module').then(m => m.DevelopmentModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: '',
        redirectTo: '/consorcio/cargas',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AuthorizationModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutesRoutingModule {}
