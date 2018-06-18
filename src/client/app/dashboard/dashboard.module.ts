import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {SearchByKeyPipeModule} from '../shared/pipes/search-by-key.pipe'
@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchByKeyPipeModule
  ],
  declarations: [   
    DashboardComponent
  ]
})

export class DashboardModule { }
