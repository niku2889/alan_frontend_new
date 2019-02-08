import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogService } from './Blog.service';

@Component({
    selector: 'app-wp-blog',
    templateUrl: './Blog.component.html',
    styleUrls: ['./Blog.component.scss'],
    providers: [BlogService]
})
export class BlogComponent implements OnInit {
    posts: any[] = [];

    constructor(private wp: BlogService) {
        this.wp.getPosts()
            .subscribe(data => {
                this.posts = data;
            });
    }

    ngOnInit() {

    }
}