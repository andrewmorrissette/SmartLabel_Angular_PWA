import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
//import {WordpressService} from '../../services/wordpress/wordpress.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map } from 'rxjs/operators';

import {Observable, VirtualTimeScheduler} from 'rxjs';


import {Category} from '../../models/wordpress/category.model';
import {Comment} from '../../models/wordpress/comment.model';
import{Post} from '../../models/wordpress/post.model';
import{Tag} from '../../models/wordpress/tags.model';
import{Show} from '../../models/wordpress/showClass.model';
import { reduce, catchError } from 'rxjs/operators';
import {SubscriptionLike} from 'rxjs';
//import {AuthenticateService} from '../../services/wordpress/authenticate.service';
import {LocalAuthenticateService} from '../../services/localWordpress/authenticate.service';


@Component({
  selector: 'app-wordpress-chat',
  templateUrl: './wordpress-chat.component.html',
  styleUrls: ['./wordpress-chat.component.less']
})
export class WordpressChatComponent implements OnInit, OnDestroy {
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  
  constructor(
    private http: HttpClient, 
    private sanitizer: DomSanitizer, 
    private wordpressAPI:LocalWordpressService,
    private _route: Router,
    private _router: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private auth:LocalAuthenticateService
  ) { }

  private currentComments: Comment[]=[];
  private answeredComments: Comment[]=[];
  private displayQuestions: boolean=false;
  private message:string;
  private messageInput:string;
  private postID:string;
  private token:string = "";
  private commentSubscription:SubscriptionLike;
  private postSubscription:SubscriptionLike;
  private currentPost: Post;
  private isLoggedIn:boolean = false;
  private isUnderQA = false;
  private isSpecificPost = false;

  ngOnInit() {
    this.token = this.auth.getToken();
    console.log("Token from login: ",this.token);
    if(this.token != null){
      console.log("Setting Token in WordpressAPI");
      this.wordpressAPI.setAuthToken(this.token);
      console.log("Token in API: ",this.wordpressAPI.getAuthToken());
      this.isLoggedIn=true;
    }
    let postID:string = this._router.snapshot.paramMap.get("id")
    console.log("Post ID: ",postID);
    if(postID != null && postID!==""){
      this.postID = postID;
      this.postSubscription = this.wordpressAPI.getPostByPostID(Number(postID)).subscribe((post)=>{
        console.log("Post Pulled up:",post);
        this.currentPost = post;
        this.commentSubscription = this.wordpressAPI.getCommentsOfPostID(Number(postID)).subscribe((allComments=>{
          var postComments = allComments;
          this.currentComments = postComments;
          console.log(postComments);
          for(let comment of this.currentComments){
            console.log(comment.content.rendered);
          }
        }));
      });
    }
    else{
      console.log("Display All chat rooms?");
    }
  }

  ngOnDestroy(){
    this.commentSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }


  displayAnswers(){
    console.log("Displaying Answers")
    this.isUnderQA = true;
    var unarrangedComments:Comment[]=[];
    var currentComments = this.currentComments;
    var childrenComments:Comment[]=[];
    for(var comment of currentComments){
      if(comment.parent !== 0){
        childrenComments.push(comment);
      }
    }
    for(var child of childrenComments){
      for(var parent of currentComments){
        if(parent.id === child.parent){
          unarrangedComments.push(child);
          unarrangedComments.push(parent);
          
          break;
        }
      }
    }
    this.answeredComments = unarrangedComments;
    this.displayQuestions = true;
  }

  displayAll(){
    this.displayQuestions = false;
    this.isUnderQA = false;
  }

  send(){
    this.message = this.messageInput;
    this.messageInput = "";

    console.log("Sending");
    var newComment:Comment;

    const data = JSON.stringify({

      "content":this.message,
      "date": new Date(),
      "date_gmt": new Date().toUTCString,
      "parent":"0",
      "post":this.postID
    })

    this.wordpressAPI.postCommentOnPostID(this.postID,data,this.message).subscribe((response)=>{
      console.log("Response",response);
      this.message="";
    })
  }

  handleSubmit(event){
    if(event.keyCode === 13){
      this.send();
    }

  }

  login(){
    this._route.navigate(['/login']);
  }

  logout(){
    this.wordpressAPI.setAuthToken("");
    this.auth.setToken("");
    this.isLoggedIn = false;
  }

  //If trying to get just the code
  public getCode(url: string): string {
    console.log("Getting Parameter",name,url);
    var istoken:boolean=false;
    var tempString:string="";
    var token:string = "";
    for(let char of url){
      if(char === "?"){
        istoken=true;
      }
      else if(istoken){
        if(tempString!== "code="){
          tempString= tempString+char;
        }
        else if(tempString === "code="){
          if(char === "&"){
            return token;
          }
          else{
            token = token + char;
          }
        }
      }
    }
    return null;
  }
}

