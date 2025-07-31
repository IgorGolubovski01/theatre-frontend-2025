import { Component } from '@angular/core';
import { ProjectionModel } from '../models/projection.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectionService } from '../services/projection.service';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-details',
  imports: [MatTableModule, NgIf, MatButtonModule, MatCardModule, MatChipsModule, MatProgressBarModule, NgFor, RouterLink, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  service = UserService


  displayedColumns: string[] = ['movie'];
  dataSource: ProjectionModel[] | null = null

  constructor(private route: ActivatedRoute, public utilService: UtilsService) {
    route.params.subscribe(params => {
      ProjectionService.getProjectionById(params['id'])
        .then(rsp => {
          this.dataSource =[rsp.data]
        })
    })
  }
}
