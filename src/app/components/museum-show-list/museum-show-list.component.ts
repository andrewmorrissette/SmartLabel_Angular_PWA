import { Component, OnInit, OnChanges, AfterContentInit, SimpleChanges } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {WordpressService} from '../../services/wordpress/wordpress.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs';


import {Category} from '../../models/wordpress/category.model';
import {Comment} from '../../models/wordpress/comment.model';
import{Post} from '../../models/wordpress/post.model';
import{Tag} from '../../models/wordpress/tags.model';
import{Show} from '../../models/wordpress/showClass.model';
import { reduce, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-museum-show-list',
  templateUrl: './museum-show-list.component.html',
  styleUrls: ['./museum-show-list.component.less']
})
export class MuseumShowListComponent implements OnInit {

  constructor(private http: HttpClient, 
    private sanitizer: DomSanitizer, 
    private wordpressAPI:WordpressService,
    private _route: Router,) { }
  innerHTML;
  Posts:Post[];
  currentShows:Show[]
  currentCategories:Category[]
  newCategories:Category[] = [];
  testBool:boolean = false;

  ngOnInit() {
    this.wordpressAPI.getCategoriesWithNoParents().subscribe((data)=>{
      //console.log("Categories with no parents",data);
      this.currentCategories = data;
      var sortedCategories: Category[] = []
      for(var post of this.currentCategories){
        if(post.slug !== "master" && post.slug !== "uncategorized"){
          sortedCategories.push(post);
        }
      }
      this.currentCategories = sortedCategories;
    })
  }

  evaluateHTML(){
    for(let post in this.Posts){
      //console.log("Posts: ",this.Posts);
      //console.log("post: ", post);
    }
  }

  sanitizeHTML(text:string){
    var temp = this.sanitizer.bypassSecurityTrustHtml(text);
    return temp;
  }

  onClickInformation(show:Show){
    if(show.showPostID != 0){
      this._route.navigate(['/wpExhibit/',show.showPostID]);
    }
  }

  onClick(id:number){
    this.wordpressAPI.getSubCategoriesOfCategoryID(id).subscribe((children)=>{
      //console.log("Chillens",children);
      if(children.length===0){
        this.wordpressAPI.getPostsByCategoryID(id).subscribe((posts)=>{
          //console.log("Going to route");
          this._route.navigate(['/wpExhibit/',posts[0].id]);
        })
      }
      else{
        var subCategories:Category[]=children;
        var subCategoriesArray:number[]=[];
        for(var category of subCategories){
          subCategoriesArray.push(category.id);
        }
        this.wordpressAPI.getPostsByCategoryID(id).subscribe((tempPosts)=>{
          var posts:Post[]=tempPosts;
          for(var post of posts){
            if(post.categories.length !== subCategoriesArray.length+1){
              var tempCatIDs:number[]=[];
              for(var num of post.categories){
                if(num !== id && !subCategoriesArray.includes(num)){
                  tempCatIDs.push(id);
                }
              }
              //console.log("TempIDS",tempCatIDs);
              if(tempCatIDs.length===1){
                //console.log("Going to route");
                this._route.navigate(['/wpExhibit/',post.id]);
              }
            }
          }
          this.currentCategories = subCategories;
        })
      }
      

      //Might not work
      
    })
  }
}
