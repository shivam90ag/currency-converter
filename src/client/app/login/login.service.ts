import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../shared/constants/apiurl.constant';

const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class LoginService {
    constructor(
        private http:Http) {
    }

    login(data){
        return new Promise((resolve,reject)=>{
            this.http.post(ApiUrl.loginApi,data).subscribe((res)=>{
                console.log('logged in successfully')
                resolve(res);
            },(err)=>{
                console.log('error in login')
                reject(err);
            })
        })
    }
}