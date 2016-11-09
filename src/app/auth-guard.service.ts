import { Injectable } from '@angular/core';
 import { CanActivate } from '@angular/router';
import {LoginService} from './login-service.service'; 
 @Injectable()
 export class LoggedInGuard implements CanActivate {
 constructor(private LoginService: LoginService) {}

 canActivate(): boolean {
 return this.LoginService.isLogged();
 }
 }