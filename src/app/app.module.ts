import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopicComponent } from './topic/topic.component';
import { ReplyComponent } from './reply/reply.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { TopicFeedComponent } from './topic-feed/topic-feed.component';
import { TopicCreationComponent } from './topic-creation/topic-creation.component';
import { ReplyListComponent } from './reply-list/reply-list.component';
import { ReplyCreationComponent } from './reply-creation/reply-creation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { httpInterceptorProviders } from './auth/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    ReplyComponent,
    UserComponent,
    HomeComponent,
    TopicFeedComponent,
    TopicCreationComponent,
    ReplyListComponent,
    ReplyCreationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
