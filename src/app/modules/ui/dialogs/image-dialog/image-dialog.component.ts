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

    colors: string[] = ['lightblue','lightgreen','lightpink','#DDBDF1'];
    tiles: Tile[] = [
       /*  {src: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {src: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {src: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {src: 'Four', cols: 2, rows: 1, color: '#DDBDF1'}, */
      ];

    constructor(
        public dialogRef: MatDialogRef<ImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[],
    ) {
        this.data.map((elem,i)=>{
            this.tiles[i] = {
                src: elem,
                cols: 1,
                rows: i+1,
                color: this.colors[i]
            }
        });
        
    }

    ngOnInit(): void {
        console.log(this.tiles);
        
    }
}
