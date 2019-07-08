import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyMaterialModule } from  './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ExhibitComponent } from './components/exhibit/exhibit.component';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from "@angular/fire/firestore";

import {AuthenticationService} from './services/authentication.service';
import {ExhibitService} from './services/exhibit.service';
import { environment } from 'src/environments/environment';
import { SafeURLPipe } from './pipes/safe-url.pipe';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';
import { MessageComponent } from './message/message.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { FeedComponent } from './feed/feed.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ChatroomComponent } from './chatroom/chatroom.component';




const appRoutes: Routes = [
    {path: '', component: WelcomeScreenComponent, pathMatch: 'full'},
    {path: 'demo', component:AppComponent, pathMatch:'full'},
    {path: 'home', component:MainPageComponent, pathMatch:'full'},
    {path: 'exhibit/:id', component:ExhibitComponent}
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
    UserItemComponent,
    ChatroomComponent,

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthenticationService,ExhibitService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

 
})
export class AppModule { }
