import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {Observable, of, forkJoin,interval} from 'rxjs';
import {map,mergeMap, flatMap} from 'rxjs/operators';

import {Category} from '../../models/wordpress/category.model';
import {Comment} from '../../models/wordpress/comment.model';
import{Post} from '../../models/localWordpressModels/post.model';
import{Tag} from '../../models/wordpress/tags.model';
import {selectedLabels} from 'src/app/models/localWordpressModels/selectedlabels.model';
import {smartLabel} from 'src/app/models/localWordpressModels/smartLabel.model';
@Injectable({
  providedIn: 'root'
})
export class LocalWordpressService {

  //////////////////
  //////CHANGE//////
  //////////////////
  private personalWordpressSite:string = "http://localhost/cultureconnect/"//"https://02911d53.ngrok.io/cultureconnect/"
  //"testingsmartlabel.art.blog/"; //Change to your URL
  private isPaid:boolean = true; //Are you paying for it to use plugins?
  private blogID:string = "164354823"; //can get at https://public-api.wordpress.com/rest/v1.1/sites/$yourSite
  private clientID:string = "66565" //Given after creating the application in developer.wordpress.com
  private globalToken:string = "RZnbxraO4Z";
  private clientSecretKey:string = "TMSblbnwAidBY5hld5S0rEyJUa7PFOY60uF3bsha4JoTNysYPfXby0ib49Z0v0oW";
  private clientAuthToken:string = "";
  private authCode:string = "";


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
    return this.http.get<Category[]>(this.wordpressAPI+"onDisplay?parent=0");
  }

  getPostsByCategoryID(ID:number):Observable<Post[]>{
    console.log("API CALL: ",this.wordpressAPI + 'app_posts?ondisplay=' + ID + "&per_page=100");
    return this.http.get<Post[]>(this.wordpressAPI + 'app_posts?ondisplay=' + ID + "&per_page=100");
   }

   getPostByPostID(id:number):Observable<Post>{
     return this.http.get<Post>(this.wordpressAPI+"app_posts/"+id.toString());
   }

   getLabels():Observable<selectedLabels>{
    return interval(1000).pipe(flatMap(()=>{
      return this.http.get<selectedLabels>(this.wordpressAPI+"pages?slug=label-select");
    }));
   }
   getLabelByLabelID(id:number):Observable<smartLabel>{
     return this.http.get<smartLabel>(this.wordpressAPI+"label/"+id.toString());
   }
  getSubCategoriesOfCategoryID(categoryID:Number){
    return this.http.get<Category[]>(this.wordpressAPI+"onDisplay?parent="+categoryID);
  }

  getCommentsOfPostID(postID:Number){
    return interval(1000).pipe(flatMap(()=>{
      return this.http.get<Comment[]>(this.wordpressAPI + "comments?app_post=" + postID.toString());
    }));
    //return this.http.get<Comment[]>(this.wordpressAPI + "comments?post=" + postID.toString());
  }

  postCommentOnPostID(PostID:string,data:any,content:string){
    console.log("Inside Service",data);

    //Code that worked: eDrnE2O0Y2h@tjq1E3T6QRV&1fDzMPLb0w*nSgIelaXKX46g@f23#N$L^jezsFIK
    let headers = new HttpHeaders({
      'Authorization':'BEARER ' + this.clientAuthToken
    });
    console.log("Client Authentication",this.clientAuthToken);
    //headers.append('Authorization',"Bearer "+this.clientAuthToken);
    console.log("Headers",headers.has('Authorization'));
    let options = {headers:headers};
    console.log("Options",options.headers.getAll('Authorization'));
    console.log(this.http.post(this.wordpressAPI+"app_posts/"+PostID+"/replies/new",data,options),"API CALL");
    return this.http.post(this.wordpressAPI+"comments?post="+PostID+"&content="+content,data,options);

    
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
  
  //Get all the categories
  //fork and get multiple posts for each category id
  //using new posts, create show[]
  getCategoriesByID(ids:number[]):Observable<Category[]>{
    console.log("ID's to Fork",ids);
    let observableBatch = [];
    ids.forEach((num)=>{
      observableBatch.push(this.http.get(this.wordpressAPI+"onDisplay/"+num.toString()));
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
     this.http.get(this.wordpressAPI + 'onDisplay?slug=' + name).subscribe(data =>{
      selectedCategory = data[0];
     })
     console.log("onDisplay by Name: ",selectedCategory);
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
     
    return this.http.get<Category[]>(this.wordpressAPI + 'onDisplay?per_page=100');
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
    console.log("onDisplay With Same Parents: ",selectedCategories);
    return selectedCategories;
   }
}


