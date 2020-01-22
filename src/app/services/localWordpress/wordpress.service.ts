//toDo:
//Look into each request and see if using ?_filter=parameters will be faster
//Look at getNewLabels() for an example. Will only return the ID's and the title.

import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, of, forkJoin,interval} from 'rxjs';
import {map,mergeMap, flatMap} from 'rxjs/operators';

import {Category} from '../../models/localWordpressModels/category.model';
import {Comment} from '../../models/localWordpressModels/comment.model';
import{Post} from '../../models/localWordpressModels/post.model';
import{Tag} from '../../models/localWordpressModels/tags.model';
import {selectedLabels} from 'src/app/models/localWordpressModels/selectedlabels.model';
import {smartLabel} from 'src/app/models/localWordpressModels/smartLabel.model';
import {newLabel} from 'src/app/models/localWordpressModels/newLabel.model';
import {Artwork} from 'src/app/models/localWordpressModels/artwork.model';
import {extendedLabel} from 'src/app/models/localWordpressModels/extendedLabel.model';

@Injectable({
  providedIn: 'root'
})
export class LocalWordpressService {

  //////////////////
  //////CHANGE//////
  //////////////////
  private personalWordpressSite:string = "http://culturalnexus.msu.edu/wordpress"
  //"testingsmartlabel.art.blog/"; //"http://localhost/cultureconnect/"
  private authToken:string = "";



  //////////////////
  //DO NOT CHANGE///
  /////////////////

  private wordpressAPI:string="http://culturalnexus.msu.edu/wordpress/wp-json/wp/v2/"; //FINAL URL Determined in constructor

  private MasterLevelTag="";  


  
  constructor(private http:HttpClient) {
   }

   setAuthToken(token:string){
     this.authToken=token;
   }
   getAuthToken():string{
     return this.authToken;
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
   getNewLabel(id:number):Observable<newLabel>{
    return this.http.get<newLabel>(this.wordpressAPI+"labels2/"+id.toString());
   }
   
   //Will only return the ID & The title (faster)
   getNewLabels():Observable<newLabel[]>{
     return this.http.get<newLabel[]>(this.wordpressAPI+"labels2?_filter=id,title");
   }
   getExtendedLabel(id:number):Observable<extendedLabel>{
     return this.http.get<extendedLabel>(this.wordpressAPI+"extended/"+id.toString());
   }
   getLabelByLabelID(id:number):Observable<smartLabel>{
     return this.http.get<smartLabel>(this.wordpressAPI+"label/"+id.toString());
   }
   getArtworkByArtworkID(id:number):Observable<Artwork>{
     return this.http.get<Artwork>(this.wordpressAPI+"artwork/"+id.toString());
   }
  getSubCategoriesOfCategoryID(categoryID:Number){
    return this.http.get<Category[]>(this.wordpressAPI+"onDisplay?parent="+categoryID);
  }

  getCommentsOfPostID(postID:Number){
    console.log("Inside Service, post id: ",postID);
    console.log(this.wordpressAPI + 'comments?post=' + postID.toString());
    return interval(1000).pipe(flatMap(()=>{
      return this.http.get<Comment[]>(this.wordpressAPI + "comments?post=" + postID.toString());
    }));
    //return this.http.get<Comment[]>(this.wordpressAPI + "comments?post=" + postID.toString());
  }

  postCommentOnPostID(PostID:string,data:any,content:string){
    console.log("Inside Service",data);

    //Code that worked: eDrnE2O0Y2h@tjq1E3T6QRV&1fDzMPLb0w*nSgIelaXKX46g@f23#N$L^jezsFIK
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization':'Bearer ' + this.authToken
    });
    console.log("Client Authentication",this.authToken);
    //headers.append('Authorization',"Bearer "+this.clientAuthToken);
    console.log("Headers",headers.has('Authorization'));
    let options = {headers:headers};
    console.log("Options",options.headers.getAll('Authorization'));
    console.log(this.http.post(this.wordpressAPI+"app_posts/"+PostID+"/replies/new",data,options),"API CALL");
    return this.http.post(this.wordpressAPI+"comments?app_post="+PostID+"&content="+content,data,options);

    
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


