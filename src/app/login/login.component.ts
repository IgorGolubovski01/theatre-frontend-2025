import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = ''
  public password: string = ''

  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      router.navigate(['/user']) 
      //todo
      // Sta radi ovaj router.navigate???
      return
    }



  }

  public async doLogin() {
    const success = await UserService.login(this.email, this.password);

    if (success) {
      console.log('Before navigation, localStorage:', localStorage.getItem('active'));
      this.router.navigate(['home'])
    } else {
      alert('Bad credentials.')
    }

  }



}
