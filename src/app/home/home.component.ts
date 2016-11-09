import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {User} from '../user';
import { AngularFire ,FirebaseAuth} from 'angularfire2';
import {UserLogin} from '../user-login/user-login.component';
import {LoginService} from '../login-service.service';
import { ROUTER_DIRECTIVES,Router } from '@angular/router';
import {signUpComponent} from '../signUp/signUp.component';
@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
   directives: [UserLogin,signUpComponent],
   providers:[LoginService]
})
export class HomeComponent implements OnInit {
  
  private loggedIn: boolean = false;
  private user: User;
    constructor(private af: AngularFire, private lg: LoginService,private auth: FirebaseAuth,private router:Router) {
  }
  
  isLogged(){
    return this.lg.isLogged();
  }
  ngOnInit(){
   
  }
}
