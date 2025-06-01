import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { HeroSectionComponent } from './components/pages/hero-section/hero-section.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { EarningsComponent } from './components/pages/home/earnings/earnings.component';
import { PaymentsComponent } from './components/pages/home/payments/payments.component';
import { CategoriesComponent } from './components/pages/home/categories/categories.component';
import { LogsComponent } from './components/pages/home/admin/logs/logs.component';
import { DashboardComponent } from './components/pages/home/dashboard/dashboard.component';
import { UsersComponent } from './components/pages/home/admin/users/users.component';

export const routes: Routes = [
  { path: '', component: HeroSectionComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'earnings', component: EarningsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'admin/users', component: UsersComponent },
      { path: 'admin/logs', component: LogsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
