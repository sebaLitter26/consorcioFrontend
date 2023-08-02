import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CoolDirectivesModule } from '../../ui/cool-input/cool-directives/cool-directives.module';
import { DashboardCardModule } from '../../ui/dashboard-card/dashboard-card.module';
import { DynamicTableModule } from '../../ui/dynamic-table/dynamic-table.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './services/user-service.service';
import { UserAdminComponent } from './usuarios/user-admin.component';


const routes: Routes = [
    {
        path: 'user-admin',
        component: UserAdminComponent,
        data: { animation: 'isLeft' } 
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    /* {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    } */
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DashboardCardModule,
        DynamicTableModule,
    ],
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
        UserAdminComponent,
    ],
    providers: [
        UserService
    ],
    exports:[
        ProfileComponent,
        ProfileDetailComponent,
    ]
})
export class UserModule { }
