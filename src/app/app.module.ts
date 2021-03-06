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
import { ReplyCreationComponent } from './reply-creation/reply-creation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { httpInterceptorProviders } from './auth/services/auth-interceptor.service';
import { AuthGuard } from './auth/services/auth-guard.guard';
import { NegateAuthGuard } from './auth/services/negate-auth-guard.guard';
import { RegionsComponent } from './regions/regions.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    ReplyComponent,
    UserComponent,
    HomeComponent,
    TopicFeedComponent,
    TopicCreationComponent,
    ReplyCreationComponent,
    LoginComponent,
    RegisterComponent,
    RegionsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders, AuthGuard, NegateAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
