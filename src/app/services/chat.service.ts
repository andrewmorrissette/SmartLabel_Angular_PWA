import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {Exhibit} from '../models/exhibit.model';
import * as firebase from 'firebase';
import { templateJitUrl } from '@angular/compiler';

import {ChatMessage} from '../models/chat-message.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  

  constructor(private db:AngularFireDatabase, private afAuth:AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(auth =>{
      if(auth!==undefined && auth!==null){
        this.user = auth;
      }
    })
   }

  sendMessage(msg: string, exhibitID: string){
    const timeStamp = this.getTimeStamp();
    const email = "morri597@msu.edu";//this.user.email;
    //this.chatMessages = this.getMessages();
    return this.firestore.collection('messages').add({
      message: msg,
      timeSent: timeStamp,
      userName: "Dev",
      email: email,
      exhibitKey:exhibitID
    })
    
    // this.chatMessages.push({
    //   message: msg,
    //   timeSent: timeStamp,
    //   userName: this.userName.subscribe(ref =>{}),
    //   email: email});
  }  

  getMessages(): Observable<ChatMessage[]>{
    console.log("Getting Messages");
    return this.firestore.collection('messages',
    ref =>{
      return ref.orderBy('timeSent','desc').limit(25)
    }).valueChanges();

    // console.log("gettingMessages");
    // return this.db.list('/messages', ref =>{
    //   return ref.limitToLast(25).orderByKey()});
  }

  getTimeStamp(){
    const now = Date.now()
    return formatDate(now, 'long','en-US')
  }
}
