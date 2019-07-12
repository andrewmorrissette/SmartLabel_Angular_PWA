import { Component, OnInit, OnChanges } from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {AngularFireList} from 'angularfire2/database';
import {ChatMessage} from '../../../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit, OnChanges {
  message:string;
  exhibitID:string ="1";
  feed: any;


  constructor(private chatService: ChatService) { }

  ngOnInit() {
    //this.messages = this.chatService.getMessages();
    //console.log("chat messages: ",this.messages);
    console.log('insideNGOnIT');
    this.feed = this.chatService.getMessages();
    this.feed.subscribe(data=>{
      console.log(data);
    });
  }

  ngOnChanges(){
    //this.messages = this.chatService.getMessages();
    //console.log("chat messages: ",this.messages);
    console.log('insideNGOnChanges');
    this.feed = this.chatService.getMessages();
    this.feed.subscribe(data=>{
      console.log(data);
    });
  }

}
