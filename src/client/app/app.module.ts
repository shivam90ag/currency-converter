import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NoContentModule } from './no-content';
import { RegisterModule } from './register/register.module';

import { ROUTES } from './app.routes';
import { LoginModule } from './login/login.module';
import { LoggedInUserDefaultRedirection } from './shared/services/loggedin-user-default-redirection.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { UtilityService} from './shared/services/utility.service';
import { HttpService} from './shared/services/http.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LoginModule,
    RegisterModule,
    NoContentModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    ToastModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LoggedInUserDefaultRedirection,
    UtilityService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
