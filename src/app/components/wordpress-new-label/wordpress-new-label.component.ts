import { Component, OnInit, QueryList } from '@angular/core';
import { newLabel } from 'src/app/models/localWordpressModels/newLabel.model';
import { Artwork } from 'src/app/models/localWordpressModels/artwork.model';
import { extendedLabel} from 'src/app/models/localWordpressModels/extendedLabel.model';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
import { ActivatedRoute } from '@angular/router';
import { TemplateBindingParseResult } from '@angular/compiler';
import { Url } from 'url';

@Component({
  selector: 'app-wordpress-new-label',
  templateUrl: './wordpress-new-label.component.html',
  styleUrls: ['./wordpress-new-label.component.less']
})
export class WordpressNewLabelComponent implements OnInit {

  constructor(private wordpressAPI: LocalWordpressService, private _router: ActivatedRoute,) { }
  public currentLabel:newLabel=null;
  public currentArtwork:Artwork=null;
  public currentExtended:extendedLabel=null;
  public hideTombstone:boolean = false;
  public showExtended:boolean = false;

  public extendedLabel1:extendedLabel=null;
  public extendedLabel2:extendedLabel=null;
  public extendedLabel3:extendedLabel=null;
  public extendedLabel4:extendedLabel=null;

  ngOnInit() {

    let labelID:string = this._router.snapshot.paramMap.get("id");
    console.log("Label ID: ",Number(labelID));
    if(labelID != null && labelID!=""){
      this.wordpressAPI.getNewLabel(Number(labelID)).subscribe((label)=>{
        console.log("Label: ", label);
        if(label != null){
          this.currentLabel = label;
          console.log("Current Label: ",this.currentLabel);
  
          this.wordpressAPI.getArtworkByArtworkID(this.currentLabel.acf.artwork[0]).subscribe((artwork)=>{
            console.log("Artwork: ",artwork);
            if(artwork != null){
            this.currentArtwork = artwork;
            }
            if(this.currentLabel.acf.firstExtended != null){
              this.wordpressAPI.getExtendedLabel(this.currentLabel.acf.firstExtended).subscribe((extension1)=>{
                if(extension1!=null){
                  this.extendedLabel1 = extension1;
                  this.wordpressAPI.getExtendedLabel(this.currentLabel.acf.secondExtended).subscribe((extension2)=>{
                    if(extension2!=null){
                      this.extendedLabel2 = extension2;
                      this.wordpressAPI.getExtendedLabel(this.currentLabel.acf.thirdExtended).subscribe((extension3)=>{
                        if(extension3!=null){
                          this.extendedLabel3 = extension3;
                          this.wordpressAPI.getExtendedLabel(this.currentLabel.acf.fourthExtended).subscribe((extension4)=>{
                            if(extension4!=null){
                              this.extendedLabel4 = extension4;
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };
  }

onExtension(extension:extendedLabel){
  console.log("Clicked");
  console.log(extension);
  this.currentExtended = extension;
  this.showExtended = true;
}

}