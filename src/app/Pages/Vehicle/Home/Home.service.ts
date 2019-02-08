import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { MessageService } from 'primeng/components/common/messageservice';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class HomeVehicleService {

    url: string = environment.apiURL;
    cartelUrl: string = environment.cartelURL;

    constructor(private _http: HttpClient, private messageService: MessageService) {
    }

    getManufacturer() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'mvl')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getModel(manufacturer) {
        const body1 = JSON.stringify({
            Manufacturer: manufacturer
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'mvl/model', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getEngine(model, manufacturer) {
        const body1 = JSON.stringify({
            Manufacturer: manufacturer,
            Model: model
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'mvl/engine', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getYear(engine, manufacturer, model) {
        const body1 = JSON.stringify({
            Manufacturer: manufacturer,
            Model: model,
            Engine: engine
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'mvl/year', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getKtype(form) {
        const body1 = JSON.stringify({
            Manufacturer: form.manufacturer,
            Model: form.model,
            Engine: form.engine,
            Year: form.year
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'mvl/ktype', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getCategory() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'master/category/all')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getHomeSlider() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'home')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getLapArtId(ktype) {
        const body1 = JSON.stringify({
            kType: ktype
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'master/lapArt/all', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }


    getProductDetails(artId) {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'product/' + artId)
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getYinYan(ktype) {
        const body1 = JSON.stringify({
            kType: ktype
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'master/yinyan/all', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getCategoryImage() {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'category')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getRegDetails(regNo) {
        const body1 = JSON.stringify({
            reg: regNo
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'reg', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data['soap:Envelope']);

                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
        // const headers = new HttpHeaders(
        //     {
        //         'Authorization': 'Basic ' + btoa(`${'TC_myiqisltd'}:${'R00k3ry8arn'}`)
        //     });
        // return Observable.create((observer) => {
        //     observer.next('data');
        //     return this._http.get(this.cartelUrl + 'registration=' + regNo + '&servicename=XML_Cartell_MYIQIS&xmltype=soap12&readingtype=miles', { headers, responseType: 'text' })
        //         .subscribe(data => {
        //             xml2js.parseString(data.toString(), function (err, result) {
        //                 observer.next(result['soap:Envelope']);
        //             });
        //         },
        //             err => {
        //                 console.error(err);
        //             });
        // });
    }

    getAllProducts(form, category) {
        const body1 = JSON.stringify({
            Manufacturer: form.manufacturer,
            Model: form.model,
            Engine: form.engine,
            Year: form.year,
            Category: category
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'product/getAll', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getAllProductsKtype(ktype) {
        const body1 = JSON.stringify({
            "ktype": ktype
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'product/getAll/ktype', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    createVrmReg(regno, ktype, make, model, engine, year) {
        const body1 = JSON.stringify({
            "regno": regno,
            "ktype": ktype,
            "make": make,
            "model": model,
            "engine": engine,
            "year": year
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'vrmreg', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getVrmRegData(regno) {
        return Observable.create((observer) => {
            return this._http.get(this.url + 'vrmreg/' + regno)
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    getClientIpAddress() {
        return Observable.create((observer) => {
            return this._http.get('https://api.ipstack.com/check?access_key=1a2e82a46bf1b5ea3c199d7fd2c5036f')
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.error(err);
                    });
        });
    }

    addClientIP(ip) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        const body1 = JSON.stringify({
            "ip": ip,
            "date": mm + '-' + dd + '-' + yyyy
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'vrmuser', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getClientIPCount(ip) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        const body1 = JSON.stringify({
            "ip": ip,
            "date": mm + '-' + dd + '-' + yyyy
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'vrmuser/count', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getMaster(ktype, artId) {
        const body1 = JSON.stringify({
            "kType": ktype,
            "artId": artId
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'master/all', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getBrand(name) {
        const body1 = JSON.stringify({
            "name": name
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.post(this.url + 'brand/one', body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    getProductPrice(ean, brand, articleNo) {
        const body = JSON.stringify({
            "EAN": ean,
            "Brand": brand,
            "ArticleNo": articleNo
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        headers.set("Access-Control-Allow-Origin", "*");
        return Observable.create((observer) => {
            return this._http.post(this.url + 'product/price', body, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.log(err)
                    });
        });
    }

    updateProduct(id, price, link) {
        const body1 = JSON.stringify({
            "price": price,
            "amazonLink": link
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.put(this.url + 'product/' + id, body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }

    
    getEbayPrice(ean) {
        const body = JSON.stringify({
            "EAN": ean
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        headers.set("Access-Control-Allow-Origin", "*");
        return Observable.create((observer) => {
            return this._http.post(this.url + 'product/ebayprice', body, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        console.log(err)
                    });
        });
    }

    updateEbayProduct(id, price, link) {
        const body1 = JSON.stringify({
            "price":"",
            "ebayPrice": price,
            "ebayLink": link
        })
        let headers = new HttpHeaders();
        headers = headers.set('content-Type', 'application/json;charset=utf-8');
        return Observable.create((observer) => {
            return this._http.put(this.url + 'product/' + id, body1, { headers: headers })
                .subscribe(data => {
                    observer.next(data);
                },
                    err => {
                        observer.next(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                    });
        });
    }
}
