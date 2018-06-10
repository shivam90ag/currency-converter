import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { 
      	path: '', 
        component: DashboardComponent,
        canActivate:[AuthGuard]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class DashboardRoutingModule {
    
}
