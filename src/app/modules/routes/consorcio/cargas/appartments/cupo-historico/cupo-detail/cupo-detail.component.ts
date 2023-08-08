import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CupoSelection, CupoSucursal } from '../..';


@Component({
  selector: 'app-cupo-detail',
  templateUrl: './cupo-detail.component.html',
  styleUrls: ['./cupo-detail.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CupoInformationComponent{
  
    data: CupoSucursal | null = null;
    loading: boolean = false;

    constructor(
        public router: Router,
    ) {}

    findLegajo(){
        this.router.navigate(['/recursos/carga-psicotecnico'], {queryParams: this.data, skipLocationChange: true} );
       // history.pushState({psicotecnico : this.data}, "", "/recursos/carga-psicotecnico");
    }

}


