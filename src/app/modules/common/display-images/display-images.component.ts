import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowImagesDialogComponent } from './show-images-dialog/show-images-dialog.component';
import { CustomCellComponent } from '../../../../ui/dynamic-table';
import { SerialFindings } from '../..';

@Component({
    selector: 'app-display-images',
    templateUrl: './display-images.component.html',
    styleUrls: ['./display-images.component.scss'],
})
export class DisplayImagesComponent implements CustomCellComponent {

    data: SerialFindings | null = null;

    _mouseOver: boolean = false;

    constructor(
        private matDialog: MatDialog,
    ) { }

    showImagesDialog($event: MouseEvent): void {
        $event.stopPropagation();

        this.matDialog.open(ShowImagesDialogComponent, {
            data: this.data?.imgs,
            panelClass: "xs-padding-panel",
        });
    }
}
