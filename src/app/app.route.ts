import { provideRouter, RouterConfig } from '@angular/router';
import {AppComponent} from './app.component';
import {postList} from './post-list/post-list.component';
import {HomeComponent} from './home/home.component';
import {LoggedInGuard} from './auth-guard.service';
const routes: RouterConfig = [

   // { path: '', redirectTo:'main', terminal:true },
  { path: 'feed', component: postList, canActivate: [LoggedInGuard] },
   { path: '', component: HomeComponent },
];

export const appRouterProviders = [
  provideRouter(routes)
];