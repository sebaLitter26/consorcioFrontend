import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoolInputModule } from './ui/cool-input/cool-input.module';
import { CoolDirectivesModule } from './ui/cool-input/cool-directives/cool-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutesCommonModule } from './common/routes-common.module';
import { DynamicTableModule } from './ui/dynamic-table/dynamic-table.module';
import { DashboardCardModule } from './ui/dashboard-card/dashboard-card.module';
import { ProcessStatusModule } from './process-status/process-status.module';
import { LoadersModule } from './ui/loaders/loaders.module';
import { CloudinaryModule } from '@cloudinary/ng';
import { CoolFileInputModule } from './ui/cool-file-input/cool-file-input.module';

@NgModule({
    exports: [
        CommonModule,
        MaterialModule,
        CloudinaryModule,
        ProcessStatusModule,
        ReactiveFormsModule,
        CoolDirectivesModule,
        
    ]
})
export class SharedModule {}