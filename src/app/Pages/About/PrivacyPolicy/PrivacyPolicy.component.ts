import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment.prod';

@Component({
   selector: 'app-PrivacyPolicy',
   templateUrl: './PrivacyPolicy.component.html',
   styleUrls: ['./PrivacyPolicy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
   url: string = environment.apiURL;
   privacyPolicyData: any;

   constructor(private _http: HttpClient) { }

   ngOnInit() {
      this.getPrivacy()
         .subscribe(data => {
            this.privacyPolicyData = data;
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
