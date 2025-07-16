import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProjectionModel } from '../models/projection.model';
import { ProjectionService } from '../services/projection.service';
import { NgIf } from '@angular/common';
import { UtilsService } from '../services/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-show-times',
  imports: [MatTableModule, NgIf, MatButtonModule, RouterLink],
  templateUrl: './show-times.component.html',
  styleUrl: './show-times.component.css'
})
export class ShowTimesComponent {
    displayedColumns: string[] = ['movie', 'genre', 'date', 'price', 'rating', 'action'];
    dataSource: ProjectionModel[] | null = null

    constructor(public utils: UtilsService){
      ProjectionService.getProjections()
      .then(rsp=>this.dataSource = rsp.data)
    }

}
