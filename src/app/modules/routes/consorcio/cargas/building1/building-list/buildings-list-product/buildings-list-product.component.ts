import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CustomCellComponent } from 'src/app/modules/ui/dynamic-table';
import { Building, BuildingsListProduct } from '../..';
import { PluImageComponent } from 'src/app/modules/common/plu-image/plu-image.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from 'src/app/modules/ui/dialogs/image-dialog/image-dialog.component';

/**
 * Componente custom para pasarle a la Dynamic table y mostrar el Producto 
 */
@Component({
  selector: 'app-buildings-list-product',
  templateUrl: './buildings-list-product.component.html',
  styleUrls: ['./buildings-list-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsListProductComponent implements OnInit, CustomCellComponent {
  /** Se asigna por la Dynamic table */
  data: Building | null = null;
  appartments: any | null = null;  //BuildingsListProduct
  _mouseOver: boolean = false;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    if(this.data && this.data) this.appartments = this.data?.appartments;
  }

  openPluImage($event: MouseEvent): void {
    $event.stopPropagation();

    this.matDialog.open(ImageDialogComponent, {
        data: this.data?.appartments,
        panelClass: "xs-padding-panel",
    });
}
}
