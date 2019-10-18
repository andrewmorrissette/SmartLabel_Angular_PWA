import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyMaterialModule } from  './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { fromEventPattern } from 'rxjs';

import { MainPageComponent } from './components/main-page/main-page.component';


import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from "@angular/fire/firestore";


import { environment } from 'src/environments/environment';
import { SafeURLPipe } from './pipes/safe-url.pipe';

//Firebase

import {AuthenticationService} from './services/authentication.service';
import {ExhibitService} from './services/exhibit.service';
import {ChatService} from './services/chat.service';

import { ExhibitComponent } from './components/firebase/exhibit/exhibit.component';
import { ChatroomListComponent } from './components/firebase/chatroom-components/chatroom-list/chatroom-list.component';
import { MessageComponent } from './components/firebase/chatroom-components/message/message.component';
import { ChatFormComponent } from './components/firebase/chatroom-components/chat-form/chat-form.component';
import { FeedComponent } from './components/firebase/chatroom-components/feed/feed.component';
import { LoginFormComponent } from './components/firebase/chatroom-components/login-form/login-form.component';
import { SignupFormComponent } from './components/firebase/chatroom-components/signup-form/signup-form.component';
import {ChatroomComponent} from './components/firebase/chatroom-components/chatroom/chatroom.component';
import {RoomItemComponent} from  './components/firebase/chatroom-components/room-item/room-item.component';


//Wordpress
import { MuseumShowListComponent } from './components/museum-show-list/museum-show-list.component';
import { WordpressPostComponent } from './components/wordpress-post/wordpress-post.component';
import {WordpressChatComponent} from './components/wordpress-chat/wordpress-chat.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { WordpressCommentComponent } from './components/wordpress-comment/wordpress-comment.component';
import {LoginComponent} from './components/login/login.component';
import {WordpressLabelComponent} from './components/wordpress-label/wordpress-label.component'

const appRoutes: Routes = [
    {path: '', component: WelcomeScreenComponent, pathMatch: 'full'},
    {path: 'demo', component:AppComponent, pathMatch:'full'},
    {path: 'home', component:MuseumShowListComponent, pathMatch:'full'},
    {path: 'home/:category', component:MuseumShowListComponent, pathMatch:'full'},
    {path: 'exhibit/:id', component:ExhibitComponent},
    {path: 'signup',component:SignupFormComponent},
    {path: 'loginFB', component:LoginFormComponent},
    {path: 'chat/:id', component:WordpressChatComponent},
    {path: 'firebaseChat/:id',component:ChatroomComponent},
    {path: 'wordpress',component:MuseumShowListComponent},
    {path: 'wpExhibit/:id',component:WordpressPostComponent},
    {path: 'wpExhibit/:id/:category',component:WordpressPostComponent},
    {path: 'login',component:LoginComponent},
    {path: 'label/:id',component:WordpressLabelComponent},
    {path: 'label/:id/:category',component:WordpressLabelComponent},
    
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    MainPageComponent,
    ExhibitComponent,
    SafeURLPipe,
    ChatroomListComponent,
    MessageComponent,
    ChatFormComponent,
    FeedComponent,
    LoginFormComponent,
    SignupFormComponent,
    ChatroomComponent,
    RoomItemComponent,
    MuseumShowListComponent,
    WordpressPostComponent,
    WordpressChatComponent,
    WordpressCommentComponent,
    LoginComponent,
    WordpressLabelComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} //<--debugging
    ),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [AuthenticationService,ExhibitService,ChatService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

 
})
export class AppModule { }
