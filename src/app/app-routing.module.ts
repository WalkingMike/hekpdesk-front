import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { TopicFeedComponent } from './topic-feed/topic-feed.component';
import { TopicCreationComponent } from './topic-creation/topic-creation.component';
import { ReplyComponent } from './reply/reply.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/services/auth-guard.guard';
import { NegateAuthGuard } from './auth/services/negate-auth-guard.guard';
import { RegionsComponent } from './regions/regions.component';
import { AdminGuard } from './auth/services/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,
    canActivate: [NegateAuthGuard] },
  { path: 'topics', component: TopicFeedComponent, },
  { path: 'topics/create', component: TopicCreationComponent,
    canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,
    canActivate: [AuthGuard] },
  { path: 'regions', component: RegionsComponent,
    canActivate: [AdminGuard] },
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
