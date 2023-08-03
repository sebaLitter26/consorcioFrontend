import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    src: string;
  }

@Component({
    selector: 'app-image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

    tiles: Tile[] = [
        
        {src: '', cols: 1, rows: 2, color: 'lightpink'},
        {src: '', cols: 1, rows: 1, color: 'lightgreen'},
        {src: '', cols: 2, rows: 1, color: '#DDBDF1'},
        {src: '', cols: 3, rows: 1, color: 'lightblue'},
        
    ];

    tiles_src: Tile[] = [];

    constructor(
        public dialogRef: MatDialogRef<ImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[],
    ) {
        this.data.map((elem,i)=>{
            this.tiles_src[i] = {...this.tiles[i], src: this.data[i]}
        });
        
    }

    ngOnInit(): void {
        
        
    }
}
