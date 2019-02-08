import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
@Injectable()
export class AboutUsService {

    url: string = environment.apiURL;
    constructor(private _http: HttpClient, ) {
    }

    getDiscription() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'aboutDes')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getTeam() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'aboutTeam')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }
   
}
