import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class SitemapService {
    url: string = environment.apiURL;
    constructor(private _http: HttpClient) { }

    getMvl() {
        const body1 = JSON.stringify({
            skip: 2000
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'mvl/search', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                    });
        });
    }

}