import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-show-images-dialog',
    templateUrl: './show-images-dialog.component.html',
    styleUrls: ['./show-images-dialog.component.scss']
})
export class ShowImagesDialogComponent {

    _hoveredIndex: number = -1;

    constructor(
        public dialogRef: MatDialogRef<ShowImagesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[],
    ) {}

    openImageInNewTab(image: string, $event: MouseEvent): void {
        $event.stopPropagation();

        let newTab: Window | null = window.open("");

        if (newTab) {
            newTab.document.body.innerHTML = `<img src="${image}">`;
        }
    }
}
