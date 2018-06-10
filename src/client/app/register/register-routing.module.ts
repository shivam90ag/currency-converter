import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { RegisterComponent } from './register.component';
import { LoggedInUserDefaultRedirection } from '../shared/services/loggedin-user-default-redirection.service';
@NgModule({
  imports: [
    RouterModule.forChild([
      { 
      	path: 'signup', 
      	component: RegisterComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class RegisterRoutingModule {
    
}
