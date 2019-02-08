import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmbryoService } from '../../Services/Embryo.service';
import { Title, Meta } from '@angular/platform-browser';
import { BlogDetailsService } from './Detail.service';

@Component({
   selector: 'app-Blog-Details',
   templateUrl: './Details.component.html',
   styleUrls: ['./Details.component.scss'],
   providers: [BlogDetailsService]
})
export class BlogDetailsComponent implements OnInit {

   commentForm: FormGroup;
   response: any;
   blogDetails: any;
   blogId: any;
   emailPattern: any = /\S+@\S+\.\S+/;
   postData: any[] = [];
   shareUrl: string;
   autherData: any[] = [];
   mediaData: any[] = [];
   commentData: any[] = [];
   tagData: any[] = [];

   constructor(public embryoService: EmbryoService,
      private route: ActivatedRoute,
      private router: Router,
      private formGroup: FormBuilder,
      private wp: BlogDetailsService, private titleService: Title,
      private meta: Meta) {
      this.wp.getPostDetails(this.route.snapshot.params['id'])
         .subscribe(data => {
            this.postData = data[0];
            this.wp.getAutherDetails(this.postData['author'])
               .subscribe(data => {
                  this.autherData = data;
               });
            this.wp.getCommentDetails(this.postData['id'])
               .subscribe(data => {
                  this.commentData = data;
               });
            this.wp.getMediaDetails(this.postData['featured_media'])
               .subscribe(data => {
                  this.mediaData = data;
               });
            this.wp.getTagDetails()
               .subscribe(data => {
                  this.tagData = data;
               });
            if (this.postData['yoast_meta']) {
               this.meta.updateTag({ name: 'description', content: this.postData['yoast_meta'].yoast_wpseo_metadesc });
               this.setTitle(this.postData['yoast_meta'].yoast_wpseo_title);
            }
         });
      this.shareUrl = location.href;
   }

   ngOnInit() {
      this.commentForm = this.formGroup.group({
         first_name: [''],
         last_name: [''],
         email: ['', Validators.pattern(this.emailPattern)],
         message: ['']
      })
   }

   public setTitle(newTitle: string) {
      this.titleService.setTitle(newTitle);
   }


   public getBlogDetailsResponse(response) {
      for (let data of response) {
         if (data.id == this.blogId) {
            this.blogDetails = data;
            break;
         }
      }
   }

   public submitForm() {
      console.log(this.commentForm.value);
   }

   getTagName(tag) {
      return this.tagData.filter(a => a.id == tag);
   }
}
