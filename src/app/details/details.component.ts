import { Component } from '@angular/core';
import { ProjectionModel } from '../models/projection.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectionService } from '../services/projection.service';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  imports: [MatTableModule, NgIf, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  displayedColumns: string[] = ['movie'];
  dataSource: ProjectionModel[] | null = null

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      ProjectionService.getProjectionById(params['id'])
        .then(rsp => {
          // console.log(rsp.data)
          this.dataSource =[rsp.data]
        })
    })
  }
}
