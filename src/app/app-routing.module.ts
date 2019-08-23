import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { TopicFeedComponent } from './topic-feed/topic-feed.component';
import { TopicCreationComponent } from './topic-creation/topic-creation.component';
import { ReplyComponent } from './reply/reply.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'topics', component: TopicFeedComponent },
  { path: 'topics/create', component: TopicCreationComponent },
  { path: 'user', component: UserComponent },
  { path: 'reply', component: ReplyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
