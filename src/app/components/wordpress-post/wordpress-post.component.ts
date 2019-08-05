import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Exhibit } from 'src/app/models/exhibit.model';
import {WordpressService} from '../../services/wordpress/wordpress.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { Post } from 'src/app/models/wordpress/post.model';
import { stringify } from 'querystring';
import { Category } from 'src/app/models/wordpress/category.model';
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
    private wordpressAPI: WordpressService,
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
    subCategories:Category[]=[];
    hasObjects : boolean = false;
    

    initialiseInvites() {
      // Set default values and re-fetch any data you need.
      let id = this._router.snapshot.paramMap.get('id');
    let parentCategory:string = this._router.snapshot.paramMap.get("category");
    
    
    console.log("SubCategories: ",this.subCategories);
    this.wordpressAPI.getPostByPostID(Number(id)).subscribe((post)=>{
      console.log("Post: ",post);
      this.post = post;
      
      this.evaluateHTML();
      this.innerHTML = this.sanitizeHTML(this.post.content.rendered);  
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
      
      this.evaluateHTML();
      this.innerHTML = this.sanitizeHTML(this.post.content.rendered);  
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

  evaluateHTML(){
      //Add functions to here for each type needing to change
       //console.log("Evaluating HTML");
       var conversionTypeWanted:string = "3D";
       var conversionArray:string[]=[];
       conversionArray=this.lookForTag(conversionTypeWanted);
       //console.log("Converted String",conversionArray);
       var tempText = this.post.content.rendered;
       //console.log("Are they different",[conversionArray[0],this.post.content.rendered]);
       
       if(conversionArray[0][0]==="<"&&conversionArray[0][1]==="a"){
        this.post.content.rendered = tempText.replace(conversionArray[0],this.replacementTag([conversionTypeWanted,conversionArray[1]]));
       }
       //console.log("After Conversion Post",this.post);
  }

  lookForTag(type:string):string[]{
    if(type === "3D"){
      var characterizedString:string="";
      var href:string="";
      var count:number = 0;
      var bracketCount:number=0;
      for(let character of this.post.content.rendered){
        count++;

        //console.log("Debugging ending",character,bracketCount,characterizedString.substring(10,12));
        if(characterizedString[0] === "<" && characterizedString[1] === "a"){
          //console.log("current string",characterizedString);
          //console.log("Character, ",character);
          if(characterizedString.substring(10,12)==="3D" && count>=20 && character !== '"'){
            characterizedString = characterizedString+character;
            href = href + character;
            if(character===">" ){
              //console.log("Adding Bracket");
              bracketCount=bracketCount+1;
            }
          }
          else if(character===">" ){
            //console.log("Adding Bracket");
            characterizedString = characterizedString+character;
            bracketCount=bracketCount+1;
          }
          
          else if(character===">"&& bracketCount===2 && characterizedString.substring(10,12)==="3D"){
            return [characterizedString,href];
          }
          else if(character === " "){
            characterizedString = characterizedString+character;
          }
          else{
            characterizedString = characterizedString + character;
          }
        }
        if(character === "a" && characterizedString === "<"){
          characterizedString = characterizedString + character;
        }
        else if(character === "<" && characterizedString.substring(10,12)!=="3D"){
          //console.log("Debug",characterizedString.substring(10,12));
          characterizedString =  character;
          bracketCount = 0;
        }
        if(character===">"&& bracketCount===2 && characterizedString.substring(10,12)==="3D"){
          return [characterizedString,href.slice(6,href.length-5)];
        }
      }
    }
    return ["",""];
  }

  replacementTag(type:string[]):string{
    //console.log("Testing",type);
    if(type[0] === "3D"){
      //console.log("Inside");
      var newTag = '<div style="display:flex; margin:3em auto; flex-direction: column; max-width:400px; overflow:hidden;"><model-viewer style="width:100%" class="model" *ngIf="hasModel()"src="'+type[1]+'" ios-src="assets/Astronaut.usdz" alt="A 3D model of an astronaut" background-color="#70BCD1" shadow-intensity="1" camera-controls="" interaction-prompt="auto" auto-rotate="" ar="" magic-leap=""></model-viewer></div>'
      return newTag;
    }
    return "";
  }

  sanitizeHTML(text:string){
    var temp = this.sanitizer.bypassSecurityTrustHtml(text);
    return temp;
  }

  // checkSubCategories(id:string){
  //   this.wordpressAPI.getSubCategoriesOfCategoryID(Number(id)).subscribe((children)=>{
  //     this.subCategories = children;
  //   })
  // }

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
        console.log("post cat length: ",post.categories.length);
        console.log("subCategoriesArray Length: ",subCategoriesArray.length);
        var hasMasterPost:number[]=[];
        var hasNextPost:number[]=[];
        if(post.categories.length !== subCategoriesArray.length+1){
          var tempCatIDs:number[]=[];
          
          for(var num of post.categories){
            if(num !== id && !subCategoriesArray.includes(num)){
              tempCatIDs.push(id);
            }
          }
          console.log("TempIDS",tempCatIDs);
          if(tempCatIDs.length===1){
            console.log("Going to route");
            hasNextPost.push(post.id,id);
            //this._route.navigate(['/wpExhibit/',post.id,id]);
          }
          else if(tempCatIDs.length===0){
            hasMasterPost.push(post.id,id);
          }
        }

        //this._route.navigate(['/wpExhibit/',post.id,id]); //could be wrong
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

      //this.currentCategories = subCategories;
      }
    })
  }
  onBack(){
    this._location.back();
  }

}
