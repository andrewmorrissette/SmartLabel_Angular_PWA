import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
import {LocalAuthenticateService} from '../../services/localWordpress/authenticate.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { map } from 'rxjs/operators';

import {Observable} from 'rxjs';
import { database } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private wordpressAPI:LocalWordpressService,private auth:LocalAuthenticateService,private _route: Router, 
    private router: Router,) { }

  private hasCode:boolean = false;
  private hasToken:boolean = false;
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  login(){
    console.log(this.f.username.value);
    console.log(this.f.password.value);
    //var tempURL:string = this.auth.getCodeURL();
    //window.location.href=tempURL;
    //window.location.href='https://public-api.wordpress.com/oauth2/authorize?client_id=66565&redirect_uri=https://localhost:4200/chat/16&response_type=token&blog=164354823';
  }

  onSubmit() {
    this.submitted = true;
    

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    console.log(this.f.username.value);
    console.log(this.f.password.value);

    this.auth.getAuthenticationToken(this.f.username.value,this.f.password.value).subscribe((response)=>{
      console.log("Response",response);
      if(response.token != null && response.token != "" && response.token != undefined){
        this.auth.setToken(response.token);
        console.log(this.auth.getToken(),"Token Saved");
        this._route.navigate(['/home/']);

      }
    },
    (error)=>{
      console.log("Error",error);
    })
  }

  onRegister(){

    if(this.loginForm.invalid){
      return;
    }

    
  }

}
