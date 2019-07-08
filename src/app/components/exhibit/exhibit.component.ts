import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Exhibit } from 'src/app/models/exhibit.model';
import {ExhibitService} from '../../services/exhibit.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { SecurityContext } from '@angular/core';


@Component({
  selector: 'app-exhibit',
  templateUrl: './exhibit.component.html',
  styleUrls: ['./exhibit.component.less']
})
export class ExhibitComponent implements OnInit {
  exhibitName: string;
  exhibit: Exhibit;
  showVideo: boolean = false;

  constructor(
    private _router: ActivatedRoute, 
    private _route: Router, 
    private exhibitService: ExhibitService,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    this.exhibitService.getExhibit(id).subscribe(data=>{
      this.exhibit=data[0];
      if(this.exhibit.videoURL!==null){
        this.showVideo=true;
      }else{
        this.showVideo=false;
      }
      console.log("Exhibit",this.exhibit);
      console.log("ImageURL",this.exhibit.imageURL);
      console.log("VideoURL",this.exhibit.videoURL);
    })
  }

  public getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  private hasModel():boolean{
    
    if(this.exhibit.ARModel!==undefined){
      console.log("inside HasModel True", this.exhibit.ARModel);
      return true;
    }
    else{
      console.log("inside HasModel False");
      return false;
    }
  }
  private hasVideo():boolean{
    if(this.exhibit.videoURL!=undefined){
      return true;
    }
    else{
      return false;
    }
  }
}
