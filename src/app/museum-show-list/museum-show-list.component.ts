import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml , SafeUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-museum-show-list',
  templateUrl: './museum-show-list.component.html',
  styleUrls: ['./museum-show-list.component.less']
})
export class MuseumShowListComponent implements OnInit {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }
  Posts : any;
  Testing= [];
  innerHTML;

  ngOnInit() {
    this.http.get('https://public-api.wordpress.com/wp/v2/sites/testingsmartlabel.art.blog/posts/').subscribe(data =>{
      console.log("data",data);
      this.Posts = data;
      console.log("POSTS, ", this.Posts);
      var jsonData = JSON.parse(data.toString(), (key,value)=>{
        if (typeof value === "string"){
          return value.toUpperCase();
        }
        console.log("JSON: ",value);
        return value;
      })

      //this.evaluateHTML();
    })
  }

  evaluateHTML(){
    for(let post in this.Posts){
      console.log("Posts: ",this.Posts);
      console.log("post: ", post);
    }
  }

  sanitizeHTML(text:string){
    var temp = this.sanitizer.bypassSecurityTrustHtml(text);
    return temp;
  }

  //comments
  //https://public-api.wordpress.com/wp/v2/sites/testingsmartlabel.art.blog/comments?post=16

}
