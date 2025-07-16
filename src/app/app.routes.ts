import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowTimesComponent } from './show-times/show-times.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'show-times', component: ShowTimesComponent},
    { path: 'details/:id', component: DetailsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: '' }
];
