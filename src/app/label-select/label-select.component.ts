import { Component, OnInit } from '@angular/core';
import { newLabel } from 'src/app/models/localWordpressModels/newLabel.model';
import { Artwork } from 'src/app/models/localWordpressModels/artwork.model';
import { extendedLabel} from 'src/app/models/localWordpressModels/extendedLabel.model';
import {LocalWordpressService} from 'src/app/services/localWordpress/wordpress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-label-select',
  templateUrl: './label-select.component.html',
  styleUrls: ['./label-select.component.less']
})
export class LabelSelectComponent implements OnInit {

  constructor(
    private wordpressAPI:LocalWordpressService,
    private _route: Router) { }
  
  //labels will only receive id & title
  public labels:newLabel[];

  ngOnInit() {
    this.wordpressAPI.getNewLabels().subscribe((response)=>{
      console.log("Labels: ",response);
      if(response != null){
        this.labels = response;
      }
    })
  }

  selectLabel(id:number){
    if(id!=null){
      this._route.navigate(['/newLabel/',id]);
    }
  }

}
