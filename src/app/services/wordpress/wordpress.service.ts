import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';

import {Category} from '../../models/wordpress/category.model';
import {Comment} from '../../models/wordpress/comment.model';
import{Post} from '../../models/wordpress/post.model';
import{Tag} from '../../models/wordpress/tags.model';
import{Show} from '../../models/wordpress/showClass.model';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  //////////////////
  //////CHANGE//////
  //////////////////
  private personalWordpressSite:string = "testingsmartlabel.art.blog/"; //Change to your URL
  private isPaid:boolean = false; //Are you paying for it to use plugins?

  //////////////////
  //DO NOT CHANGE///
  /////////////////
  private wordpressFreeAPIUrl:string ="https://public-api.wordpress.com/wp/v2/sites/"; //Required for Wordpress API to work (unless with paid site)
  private wordpressPaidAPIUrl:string ="wp-json/wp/v2/"; //Paid site doesn't need public-api, just wp-json/wp/v2 after their site url. 
  private wordpressAPI:string=""; //FINAL URL Determined in constructor

  private MasterLevelTag="";
  private PersonalLevelTag="";
  
  constructor(private http:HttpClient) {
    if(this.isPaid === false){
      this.wordpressAPI = this.wordpressFreeAPIUrl + this.personalWordpressSite;
    }
    else{
      this.wordpressAPI = this.personalWordpressSite + this.wordpressPaidAPIUrl;
    }
   }

   getMasterLevelTag(){
     //Go to Category looking for master name
     //Get Post ID[0]
     //Go to Master Post
     //Look at ID Number of Tag[0]
     //Go to Tags & See what name has that ID
     
    var masterCategory: Category = this.getCategoryByName("master");
    var masterPost = this.getPostsByCategoryID(masterCategory.id)[0];
    this.MasterLevelTag = this.getTagNameFromTagID(masterPost.tags[0]);


   }
   getPost(id:string) : Post{
     var post:Post;
     return post;
   }
   getCategoryByName(name:string) : Category{
    var selectedCategory:Category;
     this.http.get(this.wordpressAPI + 'categories?slug=' + name).subscribe(data =>{
      selectedCategory = data[0];
     })
     return selectedCategory;
   }

   getPostsByCategoryID(ID:number):Post[]{
    var selectedPosts:Post[];
     this.http.get(this.wordpressAPI + 'posts?categories=' + ID).subscribe(data =>{
      selectedPosts = data as any;
     })
     return selectedPosts;
   }
   getTagNameFromTagID(ID:number):string{
     var selectedTag:Tag;
     this.http.get(this.wordpressAPI + 'tags/' + ID).subscribe(data =>{
       selectedTag = data as any;
     })
     return selectedTag.slug;
   }
   getCategories():Category[]{
     //after can use get posts by categoryID
     var allCategories:Category[];
     this.http.get(this.wordpressAPI + 'categories').subscribe(data =>{
       allCategories = data as any;
     })
     return allCategories
   }
   getCategoriesWithNoParents(allCategories:Category[]):Category[]{
     //loop through all categories and for each category with parent = 0 & name !=Master or Uncategorized
     var selectedCategories:Category[];
     allCategories = this.getCategories();
     allCategories.forEach((element)=>{
      if(element.parent === 0 && element.slug !== "master" && element.slug !== 
      "uncategorized"){
        selectedCategories.push(element);
      }
    })
     return selectedCategories;
   }
   getCategoriesWithSameParent(allCategories:Category[],parentID:number):Category[]{
     var selectedCategories:Category[];
     allCategories = this.getCategories();
     allCategories.forEach((element)=>{
      if(element.parent === parentID && element.slug !== "master" && element.slug !== 
      "uncategorized"){
        selectedCategories.push(element);
      }
    })
    
    return selectedCategories;
   }

   getShowList():Show[]{
     var parentLessCategories = this.getCategoriesWithNoParents(this.getCategories());
     var shows:Show[];
     parentLessCategories.forEach((category)=>{
       //getting show info
       var postsInCategory=this.getPostsByCategoryID(category.id);
       var hasPost:boolean = false;
       postsInCategory.forEach((post)=>{
         //if any post has only count of 1 in categories return that id for show
         if(post.categories.length === 1){
           hasPost = true;
           shows.push(new Show(category.slug,category.id,post.id))
         }
       })
       if(hasPost === false){
         shows.push(new Show(category.slug,category.id,0));
       }
     })
     return shows;
   } 
}
