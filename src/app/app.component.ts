import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {User} from './user';
import { AngularFire,FirebaseObjectObservable ,FirebaseAuth} from 'angularfire2';
import {UserLogin} from './user-login/user-login.component';
import {postList} from './post-list/post-list.component';
import {LoginService} from './login-service.service';
import {FriendsComponent} from './friends/friends.component';
import { ROUTER_DIRECTIVES,Router } from '@angular/router';
import {signUpComponent} from './signUp/signUp.component';
@Component({
  moduleId: module.id,
  selector: 'root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
   directives: [ROUTER_DIRECTIVES,UserLogin,signUpComponent],
   providers:[LoginService]
})
export class AppComponent implements OnInit {
  
  private title:string= "Afeka-Face";

    constructor(private af: AngularFire, private lg: LoginService,private auth: FirebaseAuth,private router:Router) {
  }
  ngOnInit(){
    console.log(this.lg.isLogged())
   if(this.lg.isLogged())
   this.router.navigate(['feed']);
  }
}