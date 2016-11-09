import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {User} from '../user';
import { AngularFire } from 'angularfire2';
import {LoginService} from '../login-service.service';
import {postList} from '../post-list/post-list.component';
import {Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'signUp',
  templateUrl: 'signUp.component.html',
  providers: [LoginService],
  directives:[postList]
})
export class signUpComponent implements OnInit {
  public user: User;
  
  constructor(private af: AngularFire, private lg: LoginService,private router:Router) {
 
  }

  ngOnInit() {
    this.initUser();
    this.af.auth.subscribe( (user) => {
      if (user) {
        this.initUser();

      }
    });
  }
  
  initUser() {
    this.user = {
      name: '',
      email: '',
      password: '',
      authed:false
    }  
  }
  
  signUp() {
    var email = this.user.email;
    var name= this.user.name;
    var password = this.user.password;
    this.lg.registerUser({ email: email, password: password }).subscribe(registerData => {
       
      this.lg.login(registerData).subscribe(loginData => {
        this.af.database.object(`timeline/users/${this.lg.getUserId()}`).set({ name: name, email: email }).subscribe(user=>{

        });
      }, loginError => {
      });
      this.router.navigate(['feed']);
    }, registerError => {
    });
  }

}