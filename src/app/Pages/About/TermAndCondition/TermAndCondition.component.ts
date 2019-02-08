import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment.prod';

@Component({
   selector: 'app-TermAndCondition',
   templateUrl: './TermAndCondition.component.html',
   styleUrls: ['./TermAndCondition.component.scss']
})
export class TermAndConditionComponent implements OnInit {

   termContions: any;

   url: string = environment.apiURL;

   constructor(private _http: HttpClient) { }

   ngOnInit() {
      this.getPrivacy()
         .subscribe(data => {
            this.termContions = data;
         });
   }

   getPrivacy() {
      return Observable.create((observer) => {
         return this._http.get(this.url + 'privacy')
            .subscribe(data => {
               observer.next(data);
            },
               err => {
                  console.error(err);
               });
      });
   }

}
