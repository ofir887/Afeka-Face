import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode,provide } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { disableDeprecatedForms,provideForms } from '@angular/forms';
import { appRouterProviders } from './app/app.route';
import {LoggedInGuard} from './app/auth-guard.service';
import {LoginService} from './app/login-service.service';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  appRouterProviders,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyC_csu2TN8RMEKIGuz8J4f2RrYIf2QVDa0",
    authDomain: "afeka-face-omri.firebaseapp.com",
    databaseURL: "https://afeka-face-omri.firebaseio.com",
    storageBucket: "afeka-face-omri.appspot.com",
  }),
  disableDeprecatedForms(),
  provideForms(),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  LoggedInGuard,
  LoginService
]);