import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from 'src/app/modules/ui/dialogs/image-dialog/image-dialog.component';
import { CustomCellComponent } from 'src/app/modules/ui/dynamic-table';
import { Image, StringSplitterData } from '..';
import { Cloudinary } from '../../ui/cool-file-input';

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

    images: string[] = [];

    _mouseOver: boolean = false;

    constructor(
        private matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        if (!this.data || !this.componentData?.propertyPath)  return;

        let cloudinary_source: Cloudinary[] = [];

        this.data[this.componentData?.propertyPath!].forEach((elem: string)=>{
            cloudinary_source.push( JSON.parse(elem));
            
        })
        
        this.images = cloudinary_source.map(elem=> elem.secure_url);
            
        
    }

    openPluImage($event: MouseEvent): void {
        $event.stopPropagation();
        if(this.images.length==0) return;
        this.matDialog.open(ImageDialogComponent, {
            data: this.images ,
            panelClass: "xs-padding-panel",
        });
    }
}
