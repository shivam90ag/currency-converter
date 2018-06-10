import { Headers, Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpService} from '../shared/services/http.service';
import { ApiUrl } from '../shared/constants/apiurl.constant';

const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class DashboardService {
    constructor(
        private http:Http, private httpService:HttpService) {
    }

    addQuery(data,successCB,errorCB){
        this.httpService.makeHttpPostRequestWithoutToken(ApiUrl.addQueryApi,data)
         .subscribe((response)=>{
            if (response.status == 200) {
				let data = response.json();
				successCB(data);
			}
         },(error:any)=>{
            errorCB(error);
         })
    }
    deleteHistory(data,successCB,errorCB){
        this.httpService.makeHttpPostRequestWithoutToken(ApiUrl.deleteHistoryApi,data)
         .subscribe((response)=>{
            if (response.status == 200) {
				let data = response.json();
				successCB(data);
			}
         },(error:any)=>{
            errorCB(error);
         })
    }
    getHistory(data,successCB,errorCB){
        this.httpService.makeHttpGetRequestWithoutToken(ApiUrl.getHistoryApi,data)
         .subscribe((response)=>{
            if (response.status == 200) {
				let data = response.json();
				successCB(data);
			}
         },(error:any)=>{
            errorCB(error);
         })
    }
     latestCurrency(data,successCB, errorCB){
         this.httpService.makeHttpGetRequestWithoutToken(ApiUrl.latestCurrencyApi)
         .subscribe((response)=>{
            if (response.status == 200) {
				let data = response.json();
				successCB(data);
			}
         },(error:any)=>{
            errorCB(error);
         })
     }
     logout(){
        return new Promise((resolve,reject)=>{
            this.http.delete(ApiUrl.logoutApi).subscribe((res)=>{
                resolve(true)
            },(err)=>{
                reject(err);
            })
        })
    }
}