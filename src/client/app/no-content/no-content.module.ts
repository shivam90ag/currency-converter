import { NgModule } from '@angular/core';
import { NoContentComponent } from './no-content.component';
import { RouterModule, Routes }   from '@angular/router';

const routes: Routes = [
     {
        path: '',
        component: NoContentComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
        ],
    declarations: [
    	NoContentComponent
    ]
}) 
export class NoContentModule { }