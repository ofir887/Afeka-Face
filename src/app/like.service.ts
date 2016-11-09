import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import {LoginService} from './login-service.service'; 
import { FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
@Injectable()
export class LikeService {
private userdb: FirebaseListObservable<any[]>;
private userid:string;
private howMany;
  constructor(private LoginService: LoginService,private af: AngularFire) {
  }
addLike(postId:string):FirebaseObjectObservable<any>{
  this.userid=this.LoginService.getUserId();
  let num;
  num=this.getHowManyLikes(postId);
   num++;
   this.setHowManyLikes(postId,num);
  return this.af.database.object(`timeline/posts/${postId}/likes/${this.userid}`).set(true);
 
}
getAll(postId:string) {
    return this.af.database.list(`timeline/posts/${postId}/likes`);
  }
  getHowManyLikes(postId:string){
    let numberOfLikes;
     this.af.database.object(`timeline/posts/${postId}`).subscribe(post=>{
      numberOfLikes=post.numberLikes
    });
    return numberOfLikes;
  }
  setHowManyLikes(postId:string,numberOfLikes){
   return this.af.database.object(`timeline/posts/${postId}`).update({numberLikes:numberOfLikes});
  }
  isLike(postId:string):any{
    let bool:boolean;
this.userid=this.LoginService.getUserId();
let user = this.af.database.object(`timeline/posts/${postId}/likes/${this.userid}`)
user.subscribe(data=>{
  if(data.$value!==null)
    bool= true;
else
    bool= false;
});
return bool;
  }
  removeLike(postId:string){
    this.userid=this.LoginService.getUserId();
  let data= this.af.database.list(`timeline/posts/${postId}/likes/${this.userid}`);
  data.remove();
    let num;
  num= this.getHowManyLikes(postId);
   num--;
   this.setHowManyLikes(postId,num);
  }

}
