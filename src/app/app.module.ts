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

import { MainPageComponent } from './components/main-page/main-page.component';
import { ExhibitComponent } from './components/exhibit/exhibit.component';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from "@angular/fire/firestore";

import {AuthenticationService} from './services/authentication.service';
import {ExhibitService} from './services/exhibit.service';
import {ChatService} from './services/chat.service';

import { environment } from 'src/environments/environment';
import { SafeURLPipe } from './pipes/safe-url.pipe';
import { ChatroomListComponent } from './components/chatroom-components/chatroom-list/chatroom-list.component';
import { MessageComponent } from './components/chatroom-components/message/message.component';
import { ChatFormComponent } from './components/chatroom-components/chat-form/chat-form.component';
import { FeedComponent } from './components/chatroom-components/feed/feed.component';
import { LoginFormComponent } from './components/chatroom-components/login-form/login-form.component';
import { SignupFormComponent } from './components/chatroom-components/signup-form/signup-form.component';
import {ChatroomComponent} from './components/chatroom-components/chatroom/chatroom.component';
import {RoomItemComponent} from  './components/chatroom-components/room-item/room-item.component';
import { fromEventPattern } from 'rxjs';
import { MuseumShowListComponent } from './museum-show-list/museum-show-list.component';



const appRoutes: Routes = [
    {path: '', component: WelcomeScreenComponent, pathMatch: 'full'},
    {path: 'demo', component:AppComponent, pathMatch:'full'},
    {path: 'home', component:MainPageComponent, pathMatch:'full'},
    {path: 'exhibit/:id', component:ExhibitComponent},
    {path: 'signup',component:SignupFormComponent},
    {path: 'login', component:LoginFormComponent},
    {path: 'chat', component:ChatroomComponent},
    {path: 'wordpress',component:MuseumShowListComponent}
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
    MuseumShowListComponent

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
    HttpClientModule
  ],
  providers: [AuthenticationService,ExhibitService,ChatService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

 
})
export class AppModule { }
