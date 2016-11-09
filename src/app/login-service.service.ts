import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';

import { FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import {Observable} from "rxjs/Observable";


@Injectable()
export class LoginService {
    private userdb: FirebaseListObservable<any[]>
    public authState: FirebaseAuthState = null;
    
    constructor(private af: AngularFire, private auth: FirebaseAuth) {
        this.userdb = this.af.database.list('timeline/users');
        this.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }
getUserId()
  {
      if( this.authState!==null)
    return this.authState.uid;
    return this.getUserIdLocal();
     
  }
  isLogged(){
      return this.getUserIdLocal() !== null;
    
  }
  getUserIdLocal():any{
      return localStorage.getItem('uid');
  }

    registerUser(credentials: any) {
        return Observable.create(observer => {
            this.af.auth.createUser(credentials).then(authData => {
                credentials.created = true;
                observer.next(credentials);
            }).catch(error => {
                observer.error(error);
            });
        });
        //}
    }

    login(credentials) {
        return Observable.create(observer => {
            this.af.auth.login(credentials, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            }).then((authData) => {
                observer.next(authData);
            }).catch((error) => {
                observer.error(error);
            });
        });
    }
 
    getUser() {
        

        return this.af.database.object(`timeline/users/${this.getUserId()}`);
    }
    getUsernew(user:FirebaseAuthState) {
        return this.af.database.object(`timeline/users/${user.uid}`);
    }
    logOut() {
        localStorage.removeItem('uid')
        this.af.auth.logout();
    }
}
    