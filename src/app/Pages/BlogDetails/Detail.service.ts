import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class BlogDetailsService {

    url: string = environment.apiURL;
    constructor(private _http: HttpClient) { }

    getPostDetails(id) {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'wp/allpost/' + id)
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getAutherDetails(url) {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'wp/auther/' + url)
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getMediaDetails(url) {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'wp/media/' + url)
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getCommentDetails(url) {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'wp/comment/' + url)
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getTagDetails() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'wp/tag')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

}