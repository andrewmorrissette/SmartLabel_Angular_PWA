import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {Observable, of, forkJoin,interval} from 'rxjs';
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
export class LocalAuthenticateService {

  private clientID:string = "66565" //Fill in Client ID
  private redirectURI:string = "https://localhost:4200/login" //Fill in Redirect URI
  private blogID:string = "164354823" // Fill in blog ID
  private secret:string = "TMSblbnwAidBY5hld5S0rEyJUa7PFOY60uF3bsha4JoTNysYPfXby0ib49Z0v0oW"
  /////////////////////////////////////////////////////

  private clientAuthToken:string = "";
  private authCode:string = "";

  constructor(private http:HttpClient) { }

  setToken(token:string){
    this.clientAuthToken = token;
  }
  getToken(){
    return this.clientAuthToken;
  }
  setCodeToken(code:string){
    this.authCode = code;
  }
  getAuthCode(){
    return this.authCode;
  }

  getCodeURL():string{
    return "https://public-api.wordpress.com/oauth2/authorize?client_id="+this.clientID+"&redirect_uri="+this.redirectURI+"&response_type=token";
  }

  getAuthenticationToken():Observable<any>{
    const data = JSON.stringify({
      "client_id":this.clientID,
      "redirect_uri":this.redirectURI,
      "client_secret":this.secret,
      "code":"ysCGMqy8FH",
      "grant_type":"authorization_code",
    });

    const body = new HttpParams()
      .set('cient_id',this.clientID)
      .set('redirect_uri',this.redirectURI)
      .set('client_secret',this.secret)
      .set('code',"ysCGMqy8FH")
      .set('grant_type','authorization_code');


    // var data = {
    //   "client_id":this.clientID,
    //   "redirect_uri":this.redirectURI,
    //   "client_secret":this.secret,
    //   "code":this.authCode,
    //   "grant_type":"authorization_code",
    // };

    
    var headers =  new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    let options = {headers:headers};
    return this.http.post("https://public-api.wordpress.com/oauth2/token",body,options);

   }

  
}



