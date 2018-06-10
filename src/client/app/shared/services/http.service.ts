import {Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, RequestOptions, Response, URLSearchParams} from '@angular/http';

// import { CookieService } from './cookie.service';
// import { AppState } from '../../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import {ApiUrl } from '../../shared/constants/apiurl.constant';

@Injectable()
export class HttpService {

	constructor(
		private http: Http, 
		private router: Router, 
		// private cookieService: CookieService,
        // private appState:AppState
    ) {
	}
    public makeHttpPutRequestWithToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Put, data, true, timeOut);
    }

    public makeHttpPutRequestWithoutToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Put, data, false, timeOut);
    }
    public makeHttpDeleteRequestWithToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Delete, data, true, timeOut);
    }

    public makeHttpDeleteRequestWithoutToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Delete, data, false, timeOut);
    }
    public makeHttpGetRequestWithToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Get, data, true, timeOut);
    }

    public makeHttpGetRequestWithoutToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Get, data, false, timeOut);
    }

    public makeHttpPostRequestWithToken(url: string, data?: any, timeOut?) {

        return this.makeHttpRequest(url, RequestMethod.Post, data, true, timeOut);

    }
    public makeHttpPostRequestWithoutToken(url: string, data?: any, timeOut?) {
        return this.makeHttpRequest(url, RequestMethod.Post, data, false, timeOut);
    }
    private makeHttpRequest(url: string, requestMethod: RequestMethod, data?: any, needToken?: boolean, timeOut?) {
        var timeOut = timeOut || 30000;
        let requestOptions = new RequestOptions({
            method: requestMethod,
            url: url,
            // withCredentials: true
        });
        requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
        
        //if token needs for request then this block get user access token from cookies and add into Headers class properties
        if (needToken) {
        	// let token = this.cookieService.get('Csrf-Token') + '=';
       		// requestOptions.headers.append ('Csrf-Token', token);
            // let sessionData = JSON.parse(this.cookieService.get('SessionData'));
            // if (sessionData && sessionData.accessToken) {
            //     requestOptions.headers.append('Authorization', 'Bearer ' + sessionData.accessToken);
            // }
        }
        if (data) {
            if (requestMethod != 0) {
                requestOptions.body = data;
            } else {
                let params = new URLSearchParams();
                //data should be a JSON object having 'key' must be 'string' and 'value' should not be an 'object/array'
                for (let key in data) {
                    if(typeof data[key] == 'boolean' || typeof data[key] == 'number' || typeof data[key] == 'string') {
                        params.set(key, data[key].toString());
                    }
                }
                requestOptions.search = params;
            }
        }
        // this.intercept(this.http.request(url, requestOptions).timeout(timeOut));
       return this.intercept(this.http.request(url, requestOptions));
    }
    private intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (!(err.url.toString().includes(ApiUrl.loginApi) || err.url.toString().includes(ApiUrl.logoutApi)) && err.status === 401) {
                // this.appState.set('orgUserData', null);
                // this.appState.set('isAuthenticated', 0);
                // this.appState.set('headerType', 0);
                // this.cookieService.removeAll();
                this.router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });

    }
}