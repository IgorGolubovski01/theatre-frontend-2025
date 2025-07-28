import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowTimesComponent } from './show-times/show-times.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'show-times', component: ShowTimesComponent},
    { path: 'details/:id', component: DetailsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'about', component: AboutComponent},
    { path: 'add-to-cart/:id', component: AddToCartComponent},
    { path: 'my-tickets', component: MyTicketsComponent },
    { path: '**', redirectTo: '' }
];
