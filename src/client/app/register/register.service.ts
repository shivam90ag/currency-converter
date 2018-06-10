import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../shared/constants/apiurl.constant';

const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class RegisterService {
    constructor(
        private http:Http) {
    }

    register(data){
        return new Promise((resolve,reject)=>{
            this.http.post(ApiUrl.registerApi,data).subscribe((res)=>{
                console.log('signup sucessfull')
                resolve(res);
            },(err)=>{
                console.log('signup errror')
                reject(err);
            })
        })
    }
}