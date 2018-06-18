import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {Pipe, PipeTransform} from '@angular/core';



@Pipe({name: 'search'})
export class SearchByKeyPipe implements PipeTransform {
    constructor(){
    }
    transform(data, ...searchKeys){
        let filterData = JSON.parse(JSON.stringify(data || []));
        for(let i=0; i<searchKeys.length; i+=2){
            let filteredArray =[];

            if(searchKeys[i+1]&& searchKeys[i+1].trim()){
                
                searchKeys[i]=searchKeys[i]+'';;
                searchKeys[i+1]=searchKeys[i+1]+'';
                filterData = filterData.filter(function(itm:any){
                    itm[searchKeys[i]] = itm[searchKeys[i]]+''
                    return itm[searchKeys[i]] && itm[searchKeys[i]].toLowerCase().includes(searchKeys[i+1].trim().toLowerCase());
                });
            }
        }
        return filterData;
    }
}

@NgModule(
    {
        declarations: [SearchByKeyPipe],
        imports: [CommonModule],
        exports: [SearchByKeyPipe]
    })
export class SearchByKeyPipeModule {
}