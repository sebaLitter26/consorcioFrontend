import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingDetail, CustomCard } from '..';
import { Observable, of, Subject, take } from 'rxjs';
@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingDetailComponent implements OnInit {
  
  buildingDetail: BuildingDetail | null = null;
  $buildingDetail: Observable<BuildingDetail> = of(); 
  
  loading: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  mapRef: CustomCard[] = [
    {
        header: 'Series a leer',
        icon: 'fas fa-book',
        value: '',
        color: 'var(--color-defective)',
    },
    {
        header: 'Series leído',
        icon: 'fas fa-book-medical',
        value: '',
        color: 'var(--color-success)',
    },
    {
      header: 'Avance',
      icon: 'fas fa-tasks',
      value: '',
      color: 'var(--color-accent)',
  },
];

private updateDashboard(){
  const arr_series = this.buildingDetail?.series ?? [];
  //Cantidad de series a leer.
  this.mapRef[0].value = ''+arr_series.length ?? '0'; //+this.novelties.filter(item => item.estado =='wip').length; 

  //Cantidad de series leídos.
  const cant_readed = arr_series.filter(item => item.sububicacion_leida != null).length;
  this.mapRef[1].value = ''+cant_readed;

  //Porcentaje de avance del conteo.
  this.mapRef[2].value = (arr_series.length>0 ? (cant_readed/arr_series.length)* 100 : 0).toFixed(2) +' %';   //+this.novelties.filter(item => item.estado !='wip' && today == item.fecha_ult_actualizacion.split("T")[0]).length;
  
  this.changeDetectorRef.detectChanges();
}
  
  

  ngOnInit(): void {
    /** Obtiene la lista de conteos precargada por el resolver */
    this.loading = true;
    this.activatedRoute.data.pipe(take(1)).subscribe(data => {
      this.buildingDetail = data.buildingDetail;
      this.$buildingDetail = of(data.buildingDetail);
      this.loading = false;
      this.updateDashboard();
    });
    
  }

  backTobuildingsList(){
    this.router.navigate(['/buildings/buildings-list']);
  }
  
}
