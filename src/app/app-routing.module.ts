import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { TopicFeedComponent } from './topic-feed/topic-feed.component';
import { TopicCreationComponent } from './topic-creation/topic-creation.component';
import { ReplyListComponent } from './reply-list/reply-list.component';
import { ReplyComponent } from './reply/reply.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'topics', component: TopicFeedComponent,
    children: [
      {path: 'replies', component: ReplyListComponent},
    ]
  },
  { path: 'topics/create', component: TopicCreationComponent},
  { path: 'user', component: UserComponent},
  { path: 'reply', component: ReplyComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
