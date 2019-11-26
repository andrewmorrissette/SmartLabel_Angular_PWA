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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private wordpressAPI:LocalWordpressService,private auth:LocalAuthenticateService,private _route: Router, 
    private router: Router) { }
  private hasCode:boolean = false;
  private hasToken:boolean = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  registered:boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ['',Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  //Register User
  onSubmit() {
    this.submitted = true;
    console.log(this.f.email.value);
    console.log(this.f.username.value);
    console.log(this.f.password.value);
    

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.auth.registerUser(this.f.username.value,this.f.email.value,this.f.password.value).subscribe((data)=>{
      if(data.code == "200"){
        //Add haptic alert that says success
        console.log(data);
        this.registered=true;
        this._route.navigate(['/login/']);
      }
    });

    
  }
}
