import { Component } from '@angular/core';
import { ProjectionService } from '../services/projection.service';
import { ProjectionModel } from '../models/projection.model';
import { AxiosError } from 'axios';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public projections: ProjectionModel[] | null = null
  public error: string | null = null

  constructor(){
    ProjectionService.getProjections()
      .then(rsp=>this.projections = rsp.data.content)
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    


  }


}
