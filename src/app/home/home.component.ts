import { Component } from '@angular/core';
import { ProjectionService } from '../services/projection.service';
import { ProjectionModel } from '../models/projection.model';
import { AxiosError } from 'axios';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from "../error/error.component";

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    MatCardModule,
    MatButtonModule,
    NgFor,
    NgIf,
    RouterLink,
    DatePipe,
    FormsModule,
    LoadingComponent,
    ErrorComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent {
  public service = UserService;

  public projections: ProjectionModel[] | null = null
  public filteredProjections: ProjectionModel[] | null = null

  public searchTerm: string = ''
  public selectedGenre: string = ''
  public selectedDirector: string = ''
  public genres: string[] = []
  public directors: string[] = []

  public error: string | null = null

  constructor(private datePipe: DatePipe) {
    ProjectionService.getProjections()
      .then(rsp => {
        this.projections = rsp.data;
        this.filteredProjections = this.projections
        this.genres = Array.from(new Set(this.projections!.map(p => p.genre.genreName))).sort()
        this.directors = Array.from(new Set(this.projections!.map(p => p.director))).sort()

      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  
  }

  



  applyFilters() {
    if (!this.projections) {
      this.filteredProjections = null
      return;
    }

    const term = this.searchTerm.toLowerCase()

    this.filteredProjections = this.projections.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(term) ||
        p.genre.genreName.toLowerCase().includes(term) ||
        p.director.toLowerCase().includes(term);

      const matchesGenre = this.selectedGenre ? p.genre.genreName === this.selectedGenre : true
      const matchesDirector = this.selectedDirector ? p.director === this.selectedDirector : true

      return matchesSearch && matchesGenre && matchesDirector
    })
  }
}
