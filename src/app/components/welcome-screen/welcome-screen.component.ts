import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.less']
})
export class WelcomeScreenComponent implements OnInit {

  private isEntered:boolean=false;

  constructor(private _router: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
  }

  onEnter(): void{
    this.isEntered = true;
    console.log("Clicked",this.isEntered);
    this._route.navigate(['/home']);
  }

}
