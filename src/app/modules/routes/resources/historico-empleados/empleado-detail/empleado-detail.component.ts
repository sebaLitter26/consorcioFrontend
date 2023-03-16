import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Psico } from '../../models/order.model';


@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoInformationComponent{
  
    data: Psico | null = null;
    loading: boolean = false;

    constructor(
        public router: Router,
    ) {}

    findLegajo(){
        this.router.navigate(['/recursos/carga-psicotecnico'], {queryParams: this.data, skipLocationChange: true} );
       // history.pushState({psicotecnico : this.data}, "", "/recursos/carga-psicotecnico");
    }

}


