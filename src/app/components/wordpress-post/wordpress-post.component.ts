import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
//import {WordpressService} from '../../services/wordpress/wordpress.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import { Post } from 'src/app/models/localWordpressModels/post.model';
import { Category } from 'src/app/models/localWordpressModels/category.model';
import {Location} from '@angular/common';
@Component({
  selector: 'app-wordpress-post',
  templateUrl: './wordpress-post.component.html',
  styleUrls: ['./wordpress-post.component.less']
})
export class WordpressPostComponent implements OnInit,AfterContentInit {

  navigationSubscription;
  
  constructor(
    private _router: ActivatedRoute, 
    private _route: Router, 
    private wordpressAPI: LocalWordpressService,
    private sanitizer:DomSanitizer,
    private _location: Location) { 
      // this.navigationSubscription = this._route.events.subscribe((e: any) => {
      //   // If it is a NavigationEnd event re-initalise the component
      //   if (e instanceof NavigationEnd) {
      //     this.initialiseInvites();
      //   }
      // });
    }
    

    post:Post;
    innerHTML : SafeHtml;
    videoHTML: SafeHtml;
    audioURL: SafeUrl;
    subCategories:Category[]=[];
    hasObjects : boolean = false;
    hasAR:boolean = false;
    hasAudio:boolean = false;
    AR={'ios':"",'android':"",'alt':"",}
    id:string;
    

    // initialiseInvites() {
    //   // Set default values and re-fetch any data you need.
    //   let id = this._router.snapshot.paramMap.get('id');
    //   this.id = id;
    // let parentCategory:string = this._router.snapshot.paramMap.get("category");
    
    
    // console.log("SubCategories: ",this.subCategories);
    // this.wordpressAPI.getPostByPostID(Number(id)).subscribe((post)=>{
    //   console.log("Post: ",post);
    //   this.post = post;
    //   this.innerHTML = this.sanitizeHTML(this.post.acf.content); 
    //   this.videoHTML = this.sanitizeHTML(this.post.acf.video); 
      

    //   //AR
    //   this.AR = {'ios':this.post.acf.ios_source,'android':this.post.acf.source,'alt':this.post.acf.alt_text};
    //   if(this.AR.ios != "" || this.AR.android != ""){
    //     console.log("Has AR");
    //     this.hasAR=true;
    //   }
    //   if(this.post.acf.audio != ""){
    //     this.audioURL = this.sanitizeURL(this.post.acf.audio);
    //     this.hasAudio = true;
    //   }

    //   console.log("VideoHTML: ",this.videoHTML);

    //   if(parentCategory !== null && parentCategory !== ""){
    //     console.log("Checking for categories");
    //     console.log("ParentCategory",parentCategory);
    //     this.wordpressAPI.getSubCategoriesOfCategoryID(Number(parentCategory)).subscribe((children)=>{
    //       console.log("Children",children);
    //       this.subCategories = children;
    //       if(this.subCategories.length!==0){
    //         this.hasObjects = true;
    //       }
    //     })
    //   }
    // })
    // }
    

  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    this.id =id;
    let parentCategory:string = this._router.snapshot.paramMap.get("category");
    
    
    console.log("SubCategories: ",this.subCategories);
    this.wordpressAPI.getPostByPostID(Number(id)).subscribe((post)=>{
      console.log("Post: ",post);
      this.post = post;
      
      this.innerHTML = this.sanitizeHTML(this.post.acf.content);  
      this.videoHTML = this.sanitizeHTML(this.post.acf.video); 
      
      if(this.post.acf.audio != ""){
        this.audioURL = this.sanitizeURL(this.post.acf.audio);
        this.hasAudio = true;
      }

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
      }
    })
  }
  ngAfterContentInit(){
    // console.log("POSTS: ",this.post);
    
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

  onSubCategoryClick(id:number){
    console.log("I've been clicked");
    var subCategoriesArray:number[]=[];
    for(var category of this.subCategories){
      subCategoriesArray.push(category.id);
    }
    this.wordpressAPI.getPostsByCategoryID(id).subscribe((tempPosts)=>{
      console.log("I'm subscribed!");
      var posts:Post[]=tempPosts;
      for(var post of posts){
        console.log("Posts: ",posts);
        console.log("post cat length: ",post.ondisplay.values.length);
        console.log("subCategoriesArray Length: ",subCategoriesArray.length);
        var hasMasterPost:number[]=[];
        var hasNextPost:number[]=[];
        if(post.ondisplay.values.length !== subCategoriesArray.length+1){
          var tempCatIDs:number[]=[];
          
          for(var num of post.ondisplay){
            if(num !== id && !subCategoriesArray.includes(num)){
              tempCatIDs.push(id);
            }
          }
          console.log("TempIDS",tempCatIDs);
          if(tempCatIDs.length===1){
            console.log("Going to route");
            hasNextPost.push(post.id,id);
          }
          else if(tempCatIDs.length===0){
            hasMasterPost.push(post.id,id);
          }
        }
      }
      if(hasMasterPost.length!==0){
        this._route.navigate(['/wpExhibit/',hasMasterPost[0],hasMasterPost[1]]);
      }
      else if(hasNextPost.length!==0){
        this._route.navigate(['/wpExhibit/',hasNextPost[0],hasNextPost[1]]);
      }
      else{
      console.log("Should display subCategories");
      this._route.navigate(['/home/',id]);
      }
    })
  }
  onBack(){
    this._location.back();
  }

  chatClicked(){
    console.log("Chat ID: ",this.id);
    this._route.navigate(['/chat/',this.id]);
  }

}
