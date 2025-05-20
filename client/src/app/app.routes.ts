import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { HeroSectionComponent } from './components/pages/hero-section/hero-section.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HeroSectionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
