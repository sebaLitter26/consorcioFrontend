import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from 'src/app/modules/ui/dialogs/image-dialog/image-dialog.component';
import { CustomCellComponent } from 'src/app/modules/ui/dynamic-table';
import { Image, StringSplitterData } from '..';

@Component({
    selector: 'app-plu-image',
    templateUrl: './plu-image.component.html',
    styleUrls: ['./plu-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluImageComponent implements CustomCellComponent, OnInit {

    data: any;
    /** Data que contiene el path de la propiedad a mostrar. */
    componentData?: StringSplitterData;

    image: string = '';

    _mouseOver: boolean = false;

    constructor(
        private matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        if (this.data) {
            if (!this.componentData?.propertyPath) {
                return;
            }
            this.image = this.data[this.componentData?.propertyPath!] ?? '';
            console.log(this.image);
            
            
        }
    }

    openPluImage($event: MouseEvent): void {
        $event.stopPropagation();

        this.matDialog.open(ImageDialogComponent, {
            data: this.image ,
            panelClass: "xs-padding-panel",
        });
    }
}
