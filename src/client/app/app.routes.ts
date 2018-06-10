import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth-guard.service';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
    },
    {
        path: '**',
        component: NoContentComponent
    }
]