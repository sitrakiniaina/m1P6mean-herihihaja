import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { $ } from 'protractor';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String; 
  lastname: String; 
  email:String; 
  password:String;
  confirmer:String; 
  
  constructor(
    private validateService: ValidateService, 
    private flashMessagesService:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) {}

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      lastname: this.lastname, 
      email: this.email,
      password:  this.password,
      confirmer: this.confirmer
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show('Please complete all fields', {cssClass: 'alert-primary', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Use a valide email', {cssClass: 'alert-primary', timeout: 3000});
      return false;
    }
    if(!this.validateService.validatePassword(user.password,user.confirmer)){
      this.flashMessagesService.show('The 2 passwords are not identical', {cssClass: 'alert-primary', timeout: 3000});
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.router.navigate(['/login']);
        this.flashMessagesService.show('Congratulation! Please reconnect !', {cssClass: 'alert-success', timeout: 3000});
       
      }else{
        this.router.navigate(['/register']);
        this.flashMessagesService.show('Error '+data.msg, {cssClass: 'alert-primary', timeout: 3000});  
      }
    });

  }
}
