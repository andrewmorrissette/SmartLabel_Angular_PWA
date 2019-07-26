import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {WordpressService} from '../services/wordpress/wordpress.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {Category} from '../models/wordpress/category.model';
import {Comment} from '../models/wordpress/comment.model';
import{Post} from '../models/wordpress/post.model';
import{Tag} from '../models/wordpress/tags.model';
import{Show} from '../models/wordpress/showClass.model';

@Component({
  selector: 'app-museum-show-list',
  templateUrl: './museum-show-list.component.html',
  styleUrls: ['./museum-show-list.component.less']
})
export class MuseumShowListComponent implements OnInit {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private wordpressAPI:WordpressService,private _route: Router) { }
  Posts : any;
  Testing= [];
  innerHTML;
  currentShows:Show[]

  ngOnInit() {
    this.http.get('https://public-api.wordpress.com/wp/v2/sites/testingsmartlabel.art.blog/posts/').subscribe(data =>{
      console.log("data",data);
      this.Posts = data;
      //console.log("POSTS, ", this.Posts);
    })
    this.currentShows = this.wordpressAPI.getShowList();
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
      this._route.navigate(['/exhibit/',show.showPostID]);
    }
  }
  onClickShow(show:Show){
    var tempPosts:Post[]=this.wordpressAPI.getPostsByCategoryID(show.showID);
    if(tempPosts.length === 1){
      this._route.navigate(['/exhibit/',tempPosts[0].id]);
    }
    else{
      var tempShows: Show[];
      tempPosts.forEach((post)=>{
        tempShows.push(new Show(post.slug,0,post.id));
      })
    }
    this.currentShows = tempShows;
  }

  //comments
  //https://public-api.wordpress.com/wp/v2/sites/testingsmartlabel.art.blog/comments?post=16

}
