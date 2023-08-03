import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoolDirectivesModule } from './ui/cool-input/cool-directives/cool-directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcessStatusModule } from './process-status/process-status.module';

@NgModule({
    exports: [
        CommonModule,
        MaterialModule,
        ProcessStatusModule,
        ReactiveFormsModule,
        CoolDirectivesModule,
        
    ]
})
export class SharedModule {}