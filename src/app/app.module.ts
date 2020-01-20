import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyMaterialModule } from  './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SafeURLPipe } from './pipes/safe-url.pipe';

//Wordpress
import { MuseumShowListComponent } from './components/museum-show-list/museum-show-list.component';
import { WordpressPostComponent } from './components/wordpress-post/wordpress-post.component';
import {WordpressChatComponent} from './components/wordpress-chat/wordpress-chat.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { WordpressCommentComponent } from './components/wordpress-comment/wordpress-comment.component';
import {LoginComponent} from './components/login/login.component';
import {WordpressLabelComponent} from './components/wordpress-label/wordpress-label.component';
import { RegisterComponent } from './components/register/register.component';
import { WordpressNewLabelComponent } from './components/wordpress-new-label/wordpress-new-label.component'

const appRoutes: Routes = [
    {path: '', component: WelcomeScreenComponent, pathMatch: 'full'},
    {path: 'demo', component:AppComponent, pathMatch:'full'},
    {path: 'home', component:MuseumShowListComponent, pathMatch:'full'},
    {path: 'home/:category', component:MuseumShowListComponent, pathMatch:'full'},
    {path: 'chat/:id', component:WordpressChatComponent},
    {path: 'wordpress',component:MuseumShowListComponent},
    {path: 'wpExhibit/:id',component:WordpressPostComponent},
    {path: 'wpExhibit/:id/:category',component:WordpressPostComponent},
    {path: 'login',component:LoginComponent},
    {path: 'label',component:WordpressLabelComponent},
    {path: 'label/:id',component:WordpressLabelComponent},
    {path: 'register',component:RegisterComponent},
    {path: 'newLabel',component:WordpressNewLabelComponent}
    
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    SafeURLPipe,
    MuseumShowListComponent,
    WordpressPostComponent,
    WordpressChatComponent,
    WordpressCommentComponent,
    LoginComponent,
    WordpressLabelComponent,
    RegisterComponent,
    WordpressNewLabelComponent

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
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

 
})
export class AppModule { }
