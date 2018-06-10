import { Http, Headers, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private http: Http, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isUserAuthenticated(route);
    }

    isUserAuthenticated(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        console.log('Auth guard called>')
        var timeOut = timeOut || 30000;

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            url: '/api/authenticate'
        });
        requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
        let obs = this.http.get('/api/authenticate', requestOptions).catch((err, source) => {
            console.log('not logged in user')
            return Observable.of(false);
        });
        return obs.map((result) => {
            if(result){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
        })
    }

}