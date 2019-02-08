import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class BlogService {

    url: string = environment.apiURL;
    constructor(private _http: HttpClient) { }

    getPosts() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'wp/allpost')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

}