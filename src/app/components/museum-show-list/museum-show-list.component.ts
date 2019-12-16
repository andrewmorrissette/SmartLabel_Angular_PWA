import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {Category} from '../../models/localWordpressModels/category.model';
import{Post} from '../../models/localWordpressModels/post.model';
import{Show} from '../../models/localWordpressModels/showClass.model';

@Component({
  selector: 'app-museum-show-list',
  templateUrl: './museum-show-list.component.html',
  styleUrls: ['./museum-show-list.component.less']
})
export class MuseumShowListComponent implements OnInit {

  constructor(private http: HttpClient, 
    private wordpressAPI:LocalWordpressService,
    private _route: Router,
    private _router: ActivatedRoute,) { }
  Posts:Post[];
  currentCategories:Category[]

  ngOnInit() {
    //Due to using this component dynamically when exhibits are being explored
    //check to see first if a category has been clicked
    //If not display all of the Categories in Wordpress.

    let parentCategory:string = this._router.snapshot.paramMap.get("category");
    if(parentCategory !== null && parentCategory !== ""){
      this.wordpressAPI.getSubCategoriesOfCategoryID(Number(parentCategory)).subscribe((categories)=>{
        this.currentCategories = categories;
      })
    }
    else{
      this.wordpressAPI.getCategoriesWithNoParents().subscribe((data)=>{
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
  }

  onClick(id:number){
    //Determine if Category has sub posts to display (Show -> Exhibits)
    //If not, determine post that belongs to category and route to post component
    //TODO: Optimise and think of better ways of doing this task
    //TODO: Variable Name Clarity (MasterPost?)
    this.wordpressAPI.getSubCategoriesOfCategoryID(id).subscribe((children)=>{
      if(children.length===0){
        this.wordpressAPI.getPostsByCategoryID(id).subscribe((posts)=>{
          this._route.navigate(['/wpExhibit/',posts[0].id]);
        })
      }
      
      //The category gives you all of the posts within that entire directory. 
      //Algorithm determines if post is a sub directory within one more step of the tree
      //If it is only directly related with the Category we clicked, display that name
      else{
        var subCategories:Category[]=children;
        var subCategoriesArray:number[]=[];
        for(var category of subCategories){
          subCategoriesArray.push(category.id);
        }
        console.log("Category ID: ",id);
        this.wordpressAPI.getPostsByCategoryID(id).subscribe((tempPosts)=>{
          var posts:Post[]=tempPosts;
          console.log("ALL POSTS ",posts);
          var hasMasterPost:number[]=[];
          var hasNextPost:number[]=[];
          for(var post of posts){
            console.log(post,"On Display Post");
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
          this.currentCategories = subCategories;
          }
          
        })
      }
    })
  }
}
