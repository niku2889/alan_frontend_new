import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SitemapService } from './sitemap.service';
// const sitedata = require('./sitemap.json');

@Component({
    selector: 'app-sitemap',
    templateUrl: './sitemap.component.html',
    providers: [SitemapService]
})
export class SitemapComponent implements OnInit {
    mvlData: any[] = [];
    sitemapStr: string = '';

    constructor(private sm: SitemapService) {

    }

    ngOnInit() {
        
        // this.sm.getMvl()
        //     .subscribe(data => {

        //     });
    }

    saveTextAsFile(data, filename) {

        if (!data) {
            console.error('Console.save: No data')
            return;
        }

        if (!filename) filename = 'console.json'

        var blob = new Blob([data], { type: 'text/plain' }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')
        // FOR IE:

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            var e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
        }
    }


    expFile() {
        this.mvlData =[];
        for (let i = 0; i < this.mvlData.length; i++) {
            console.log(i)
            this.changeUrl(this.mvlData[i].manufacturer, this.mvlData[i].model, this.mvlData[i].engine, this.mvlData[i].year);
            if(i == (this.mvlData.length - 1)){
                var fileText = this.sitemapStr;
                var fileName = "sitemap.xml"
                this.saveTextAsFile(fileText, fileName);
            }
        }
       
    }


    changeUrl(make, model, engine, year) {
        if (make) {
            let mn = encodeURI(make.toString());
            let md = encodeURI(model.toString());
            let en = encodeURI(engine.toString());
            let yr = encodeURI(year.toString());


            let url = '/' + mn.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
                '/' + md.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
                '/' + en.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29') +
                '/' + yr.replace(/[/]/g, '%2F').replace(/%20/g, '-').replace(/[(]/g, '%28').replace(/[)]/g, '%29');

            let sitemap = '<url>' + '<loc>https://www.comparethecarpart.com' + url + '/Wiper-Blade</loc>' +
                '<lastmod>' + new Date().toISOString() + '</lastmod>' +
                '<priority>1.00</priority>' +
                '</url>';

            this.sitemapStr += sitemap;

        }
    }
}