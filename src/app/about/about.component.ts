import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, SafePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public generateMapLink(){
    return `https://www.google.com/maps?output=embed&q=istanbul`
  }
}
