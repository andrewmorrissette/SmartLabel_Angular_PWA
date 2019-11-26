import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LocalWordpressService} from '../../services/localWordpress/wordpress.service';
//import {WordpressService} from '../../services/wordpress/wordpress.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
import { Post } from 'src/app/models/localWordpressModels/post.model';
import {selectedLabels} from 'src/app/models/localWordpressModels/selectedlabels.model';
import {smartLabel} from 'src/app/models/localWordpressModels/smartLabel.model';
import {SubscriptionLike} from 'rxjs';

@Component({
  selector: 'app-wordpress-label',
  templateUrl: './wordpress-label.component.html',
  styleUrls: ['./wordpress-label.component.less']
})
export class WordpressLabelComponent implements OnInit,AfterContentInit {

  navigationSubscription;

  constructor(
    private _router: ActivatedRoute, 
    private _route: Router, 
    private wordpressAPI: LocalWordpressService,
    private sanitizer:DomSanitizer) {
    }
    

    post:Post;
    innerHTML : SafeHtml;
    videoHTML: SafeHtml;
    audioURL: SafeUrl;
    hasVideo: boolean = false;
    hasAudio: boolean = false;
    hasQRCode: boolean = false;
    labels: number[] = [];
    labelContent: smartLabel;
    id:string;
    showButtons:boolean = false;
    showLabelContent:boolean = false;
    hasImage:boolean = false;

    private labelSelectionSubscription:SubscriptionLike;


  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    if(id != "undefined" && id != "null" && id!=""){
      this.showButtons = true;
      this.wordpressAPI.getLabels().subscribe((selectedLabels)=>{
        
        console.log("Selected Label Post: ",selectedLabels[0]);
        console.log("id: ", selectedLabels[0].acf["smart-label-1"])
        this.labels.push(selectedLabels[0].acf["smart-label-1"]);
        this.labels.push(selectedLabels[0].acf["smart-label-2"]);
      });
    }
    else{
      this.getLabel(Number(id));
    }

  }
  ngAfterContentInit(){
    console.log("POSTS: ",this.post);
    
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.labelSelectionSubscription) {  
       this.labelSelectionSubscription.unsubscribe();
    }
  }

  getLabel(id:Number){
    console.log("Getting Label for number: ",id);
    this.showButtons = false;
    this.labelSelectionSubscription = this.wordpressAPI.getLabelByLabelID(Number(id)).subscribe((label)=>{
      console.log("Label: ",label);
      this.labelContent = label;
      //this.evaluateHTML();
      this.innerHTML = this.sanitizeHTML(this.labelContent.acf.content);
      
      if(this.labelContent.acf.video != ""){
        console.log("Video: ",this.labelContent.acf.video);
        this.hasVideo = true;
        this.videoHTML = this.sanitizeHTML(this.labelContent.acf.video); 
      }

      if(this.labelContent.acf.audio != ""){
        console.log("Audio: ",this.labelContent.acf.audio);
        this.hasAudio = true;
        this.audioURL = this.sanitizeURL(this.labelContent.acf.audio);
      }
      this.showLabelContent = true;

      if(this.labelContent.acf.qr_image != false){
        this.hasQRCode = true;
      }

      if(this.labelContent.acf.image != false){
        this.hasImage = true;
      }
    })
  }

  sanitizeHTML(text:string){
    var temp = this.sanitizer.bypassSecurityTrustHtml(text);
    return temp;
  }

  sanitizeURL(text:string){
    var temp = this.sanitizer.bypassSecurityTrustUrl(text);
    return temp;
  }

  // checkSubCategories(id:string){
  //   this.wordpressAPI.getSubCategoriesOfCategoryID(Number(id)).subscribe((children)=>{
  //     this.subCategories = children;
  //   })
  // }

  chatClicked(){
    this._route.navigate(['/chat/',this.id]);
  }

  onClick(id:number){
    console.log("Clicked!",id);
    this.getLabel(id);
  }
  showLabels(){
    this.showButtons = true;
    this.showLabelContent = false;
  }

}
