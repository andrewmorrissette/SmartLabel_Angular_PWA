import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../services/chat.service'
import {AngularFireList} from 'angularfire2/database';
import {ChatMessage} from '../../../models/chat-message.model';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.less']
})
export class ChatFormComponent implements OnInit {
  message:string;
  exhibitID:string ="1";
  messages: any;

  constructor( private chatService:ChatService) { }

  ngOnInit() {
  }

  send(){
    this.chatService.sendMessage(this.message,this.exhibitID);
    // this.messages = this.chatService.getMessages();
    // this.messages.subscribe(data=>{
    //   console.log(data);
    // });
  }
    //console.log("chat messages: ",this.messages);

  handleSubmit(event){
    if(event.keyCode === 13){
      this.send();
    }

  }

}
