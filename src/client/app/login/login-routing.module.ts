import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { LoginComponent } from './login.component';
import { LoggedInUserDefaultRedirection } from '../shared/services/loggedin-user-default-redirection.service';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '',  
      redirectTo: '/login', 
      pathMatch: 'full'
    },
      { 
      	path: 'login', 
        component: LoginComponent,
        canActivate:[LoggedInUserDefaultRedirection]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class LoginRoutingModule {
    
}
