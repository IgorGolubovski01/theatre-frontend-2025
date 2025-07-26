import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(private router: Router) { }

  public username: string = ''
  public email: string = ''
  public password: string = ''

  onRegister() {
    const user: UserModel = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    UserService.register(user)
      .then(response => {
        // Registration successful, now log in
        UserService.login(user.email, user.password)
          .then(success => {
            if (success) {
              alert('Registration successful');
              this.router.navigate(['home']);
            } else {
              alert('Registered, but failed to log in.');
            }
          });
      })
      .catch(error => {
        if (error.response.status === 409) {
          alert(error.response.data);
        } else {
          alert('Unexpected error');
        }
      });
  }

}





