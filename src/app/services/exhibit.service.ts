import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {Exhibit} from '../models/exhibit.model';
import * as firebase from 'firebase';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ExhibitService {

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  getExhibits(): Observable<Exhibit[]>{
    console.log("Getting Exhibits");
    return this.firestore.collection('exhibits').valueChanges();
  }

  getExhibit(id:string): Observable<Exhibit[]>{
    var temp:Exhibit;
    var ref = this.firestore.collection('exhibits',ref =>ref.where('key','==',id)).valueChanges();
    return ref;
  }
}
