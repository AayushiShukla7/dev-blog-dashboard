import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'posts',
        component: AllPostComponent,
        canActivate: [authGuard]
    },
    {
        path: 'posts/new',
        component: NewPostComponent,
        canActivate: [authGuard]
    }
];
