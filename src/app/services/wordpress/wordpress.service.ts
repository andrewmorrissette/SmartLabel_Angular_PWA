import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {Observable, of, forkJoin} from 'rxjs';
import {map,mergeMap, flatMap} from 'rxjs/operators';

import {Category} from '../../models/wordpress/category.model';
import {Comment} from '../../models/wordpress/comment.model';
import{Post} from '../../models/wordpress/post.model';
import{Tag} from '../../models/wordpress/tags.model';
import{Show} from '../../models/wordpress/showClass.model';
import { stringify } from '@angular/compiler/src/util';
import { keyframes } from '@angular/animations';

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

   getCategoriesWithNoParents():Observable<Category[]>{
    return this.http.get<Category[]>(this.wordpressAPI+"categories?parent=0");
  }

  getPostsByCategoryID(ID:number):Observable<Post[]>{
    return this.http.get<Post[]>(this.wordpressAPI + 'posts?categories=' + ID);
   }

   getPostByPostID(id:number):Observable<Post>{
     return this.http.get<Post>(this.wordpressAPI+"posts/"+id.toString())
   }

  //  getPostsByCategories(isParentless:Boolean = false, categoryName?:String):Observable<Post[]>{
  //   if(isParentless){
  //     return this.http.get(this.wordpressAPI+'categories?parent=0').pipe(flatMap((categories:Category[])=>{
  //       if(categories.length > 0){
  //         return forkJoin(categories.map((category:Category)=>{
  //           return this.http.get(this.wordpressAPI+'posts?categories='+category.id)
  //         }))
  //       }
  //     }))
  //   }
  //   if(!isParentless && categoryName!==""){
  //     return this.http.get(this.wordpressAPI+'categories?slug=' + categoryName).pipe(flatMap((categories: Category[])=>{
  //       if(categories.length > 0){
  //         return forkJoin(categories.map((category:Category)=>{
  //           return this.http.get(this.wordpressAPI+'posts?categories='+category.id)
  //         }))

  //       }
  //     }))
  //   }
  // }
  getSubCategoriesOfCategoryID(categoryID:Number){
    return this.http.get<Category[]>(this.wordpressAPI+"categories?parent="+categoryID);
  }

  getCommentsOfPostID(postID:Number){
    return this.http.get<Comment[]>(this.wordpressAPI + "comment?post=" + postID.toString());
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
    console.log("MasterTag Level: ",this.MasterLevelTag);

   }



  // getShowListObservable():Observable<Post[]>{
  //   return this.getCategories().pipe(flatMap((category:any)=>{
  //     return this.getPostsByCategoryID(294932)}));
  // }

  
  //Get all the categories
  //fork and get multiple posts for each category id
  //using new posts, create show[]
  getCategoriesByID(ids:number[]):Observable<Category[]>{
    console.log("ID's to Fork",ids);
    let observableBatch = [];
    ids.forEach((num)=>{
      observableBatch.push(this.http.get(this.wordpressAPI+"categories/"+num.toString()));
    });
    return forkJoin(observableBatch);
  }
   getPost(id:string) : Post{
     var post:Post;
     console.log("Post: ",post);
     return post;
   }
   getCategoryByName(name:string) : Category{
    var selectedCategory:Category;
     this.http.get(this.wordpressAPI + 'categories?slug=' + name).subscribe(data =>{
      selectedCategory = data[0];
     })
     console.log("Category by Name: ",selectedCategory);
     return selectedCategory;
   }
   
   

   
   getTagNameFromTagID(ID:number):string{
     var selectedTag:Tag;
     this.http.get(this.wordpressAPI + 'tags/' + ID).subscribe(data =>{
       selectedTag = data as any;
     })
     console.log("Tag Name: ",selectedTag.slug);
     return selectedTag.slug;
   }
   getCategories(): Observable<Category[]>{
     
    return this.http.get<Category[]>(this.wordpressAPI + 'categories');
    //after can use get posts by categoryID
    //  var allCategories :Category[] = [];
    //  this.http.get(this.wordpressAPI + 'categories').subscribe(data =>{
    //     let masterCategories:Category[] = <Category[]>data;
    //     let categories= masterCategories[1];
    //     console.log("ugh",masterCategories);
    //     allCategories = masterCategories;
    //     console.log("All Categories:",allCategories);
    //     return allCategories;
    //  })
   }
   
   getCategoriesWithSameParent(allCategories:Category[],parentID:number):Category[]{
     var selectedCategories:Category[]=[];
     //allCategories = this.getCategories();
     allCategories.forEach((element)=>{
      if(element.parent === parentID && element.slug !== "master" && element.slug !== 
      "uncategorized"){
        selectedCategories.push(element);
      }
    })
    console.log("Categories With Same Parents: ",selectedCategories);
    return selectedCategories;
   }

  //  getShowList(){
  //    this.getCategories().subscribe((data)=>{
  //      console.log("Testing Data",data);
  //      var parentLessCategories = this.getCategoriesWithNoParents(data);
  //      console.log("Getting Show info for each category")
  //      var shows:Show[] = [];
  //    parentLessCategories.forEach((category)=>{
  //      //getting show info
  //      this.getPostsByCategoryID(category.id).subscribe((postData)=>{
  //       var hasPost:boolean = false;
  //       console.log("Getting Post info for this category");
  //       postData.forEach((post)=>{
  //         //if any post has only count of 1 in categories return that id for show
  //         if(post.categories.length === 1){
  //           console.log("Post does not have any other categories")
  //           hasPost = true;
  //           shows.push(new Show(category.slug,category.id,post.id))
  //         }
  //       })
  //       if(hasPost === false){
  //         console.log("No posts are strictly this category")
  //         shows.push(new Show(category.slug,category.id,0));
  //       }
  //       this.setObservedShow( of (shows));
  //      });  
  //    })
  //   })
  //  }

   


}


