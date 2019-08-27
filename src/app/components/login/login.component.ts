import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {WordpressService} from '../../services/wordpress/wordpress.service';
import {AuthenticateService} from '../../services/wordpress/authenticate.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map } from 'rxjs/operators';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private wordpressAPI:WordpressService,private auth:AuthenticateService,private activatedRoute: ActivatedRoute, 
    private router: Router,) { }

  private hasCode:boolean = false;
  private hasToken:boolean = false;

  ngOnInit() {
    // var paramsObject = {};
    // window.location.search.replace(/\?/,'').split('&').map(function(o){ paramsObject[o.split('=')[0]]= o.split('=')[1]});
    // console.log("Params: ",paramsObject);
    // const routeFragment: Observable<string> = this.activatedRoute.fragment;
    // routeFragment.subscribe(fragment => {
    // let token: string = fragment.match('#')[1].replace('access_token=', '');
    // //let token: string = this.getParameterByName("access_token", location.href);
    // console.log(token);
    // });
    // this.hasCode=true;
    // if(paramsObject["code"]!==undefined){
    //   console.log("INSIDE THE THING!");
    //   this.hasCode=true;
    //   this.auth.setCodeToken(paramsObject['code']);
    // }
    if(this.auth.getToken()){
      console.log("Token is empty")
      this.hasToken=false;
    }
    var currentURL:string = this.router.url;
    console.log("CurrentURL",currentURL);
    var splitted = currentURL.split("&expires_in");
    console.log("Split URL",splitted);
    var finalToken = splitted[0].split("/login#access_token=");
    console.log("Token:",finalToken[1]);
    //Decode URL Token
    finalToken[1] = decodeURI(finalToken[1]);
    console.log("Decoded Token",finalToken[1]);
    console.log("Type of token: ",typeof(finalToken[1]));
    if(finalToken[1]!='undefined'){
      this.auth.setToken(finalToken[1]);
      this.hasToken = true;
      console.log("Setting bool",this.hasToken);
    }

    // this.activatedRoute.fragment.pipe(
    //   map(fragment => new URLSearchParams(fragment)),
    //   map(params => ({
    //     access_token:params.get('access_token'),
    //     expires_in:params.get('expires_in'),
    //     token_type:params.get('token_type'),
    //     site_id:params.get('site_id'),
    //     error:params.get('error'),
    //   }))
    // ).subscribe(res=>console.log('',res));
  }

  loginToWordpress(){
    var tempURL:string = this.auth.getCodeURL();
    window.location.href=tempURL;
    //window.location.href='https://public-api.wordpress.com/oauth2/authorize?client_id=66565&redirect_uri=https://localhost:4200/chat/16&response_type=token&blog=164354823';
  }
  getToken(){
    // this.auth.getAuthenticationToken().subscribe((response=>{
    //   console.log("Response: ",response);
    // }))
    this.router.navigate(['/home']);

  }

}
