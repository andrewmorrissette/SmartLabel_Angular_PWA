import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ExhibitService} from '../../services/exhibit.service';
import {Observable} from 'rxjs';
import {Exhibit} from '../../models/exhibit.model';
import { AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit, OnChanges {

  public isEntered:boolean=true;
  //exhibits: Exhibit[];
  exhibits: any;

  constructor(private exhibitService: ExhibitService, private _router: ActivatedRoute, private _route: Router) { }

  ngOnInit() {

    this.exhibits = this.exhibitService.getExhibits();
    this.exhibits.subscribe(data=>{
      console.log(data);
    })

    this.exhibitService.getExhibit("0").subscribe(data=>{
      console.log("Single Exhibit: ",data[0]);
    })

    ////////////////////////////////////////////
    /* Another Way to do it (uses subscribe instead, must get rid of asyncif using subscribe)
    console.log("Inside TS File: ",this.exhibits);
    this.exhibitService.getExhibits().subscribe(data=>{
      this.exhibits = data;
      console.log("Data on ngOnIT: ",this.exhibits);
      console.log(this.exhibits[0].name)
    }
      );
    *////////////////////////////////////////////
  }

  ngOnChanges(){
    //this.exhibits = this.exhibitService.getExhibits();
    //console.log(this.exhibits);
  }

  onExhibit(id): void{
    this.isEntered = true;
    console.log("Clicked",this.isEntered);
    console.log("ID: ",id);
    this._route.navigate(['/exhibit/',id]);
  }
}
