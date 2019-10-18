import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Exhibit } from 'src/app/models/exhibit.model';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
//import {WordpressService} from '../../services/wordpress/wordpress.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { Post } from 'src/app/models/localWordpressModels/post.model';
import { stringify } from 'querystring';
import { Category } from 'src/app/models/wordpress/category.model';
import {Location} from '@angular/common';
import { SafeURLPipe } from 'src/app/pipes/safe-url.pipe';
@Component({
  selector: 'app-wordpress-label',
  templateUrl: './wordpress-label.component.html',
  styleUrls: ['./wordpress-label.component.less']
})
export class WordpressLabelComponent implements OnInit,AfterContentInit {

  navigationSubscription;

  constructor(
    private _router: ActivatedRoute, 
    private _route: Router, 
    private wordpressAPI: LocalWordpressService,
    private sanitizer:DomSanitizer,
    private _location: Location) { 
      this.navigationSubscription = this._route.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
    }
    

    post:Post;
    innerHTML : SafeHtml;
    videoHTML: SafeHtml;
    audioURL: SafeUrl;
    subCategories:Category[]=[];
    hasObjects : boolean = false;
    id:string;
    

    initialiseInvites() {
      // Set default values and re-fetch any data you need.
      let id = this._router.snapshot.paramMap.get('id');
      this.id = id;
    let parentCategory:string = this._router.snapshot.paramMap.get("category");
    
    
    console.log("SubCategories: ",this.subCategories);
    this.wordpressAPI.getLabelByLabelID(Number(id)).subscribe((post)=>{
      console.log("Post: ",post);
      this.post = post;
      //this.evaluateHTML();
      this.innerHTML = this.sanitizeHTML(this.post.acf.content); 
      this.videoHTML = this.sanitizeHTML(this.post.acf.video); 
      this.audioURL = this.sanitizeURL(this.post.acf.audio);

      console.log("VideoHTML: ",this.videoHTML);

      if(parentCategory !== null && parentCategory !== ""){
        console.log("Checking for categories");
        console.log("ParentCategory",parentCategory);
        this.wordpressAPI.getSubCategoriesOfCategoryID(Number(parentCategory)).subscribe((children)=>{
          console.log("Children",children);
          this.subCategories = children;
          if(this.subCategories.length!==0){
            this.hasObjects = true;
          }
        })

        // this.checkSubCategories(parentCategory);
      }
    })
    }
    

  ngOnInit() {
    
    let id = this._router.snapshot.paramMap.get('id');
    let parentCategory:string = this._router.snapshot.paramMap.get("category");
    
    
    console.log("SubCategories: ",this.subCategories);
    this.wordpressAPI.getPostByPostID(Number(id)).subscribe((post)=>{
      console.log("Post: ",post);
      this.post = post;
      
      //this.evaluateHTML();
      this.innerHTML = this.sanitizeHTML(this.post.acf.content);  
      this.videoHTML = this.sanitizeHTML(this.post.acf.video); 
      this.audioURL = this.sanitizeURL(this.post.acf.audio);
      console.log("VideoHTML: ",this.videoHTML);
      if(parentCategory !== null && parentCategory !== ""){
        console.log("Checking for categories");
        console.log("ParentCategory",parentCategory);
        this.wordpressAPI.getSubCategoriesOfCategoryID(Number(parentCategory)).subscribe((children)=>{
          console.log("Children",children);
          this.subCategories = children;
          if(this.subCategories.length!==0){
            this.hasObjects = true;
          }
        })

        // this.checkSubCategories(parentCategory);
      }
    })
  }
  ngAfterContentInit(){
    console.log("POSTS: ",this.post);
    
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

  sanitizeHTML(text:string){
    var temp = this.sanitizer.bypassSecurityTrustHtml(text);
    return temp;
  }

  sanitizeURL(text:string){
    var temp = this.sanitizer.bypassSecurityTrustUrl(text);
    return temp;
  }

  // checkSubCategories(id:string){
  //   this.wordpressAPI.getSubCategoriesOfCategoryID(Number(id)).subscribe((children)=>{
  //     this.subCategories = children;
  //   })
  // }

  chatClicked(){
    this._route.navigate(['/chat/',this.id]);
  }

}
