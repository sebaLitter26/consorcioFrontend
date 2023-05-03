import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared.module";
import { CoolInputComponent } from "./cool-input/cool-input.component";
import { IConfig, NgxMaskDirective, provideNgxMask } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

const components = [
    CoolInputComponent,
]

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        NgxMaskDirective
        //NgxMaskModule.forRoot(maskConfig),
    ],
    declarations: components,
    exports: components,
    providers:  [provideNgxMask()]
})
export class CoolInputModule {}