import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/service/auth.service';


@Component({
  selector: 'buh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UserService,
    private authService: AuthService,
    private router: Router,
    private rout: ActivatedRoute
  ) { }

  private showMessage(message: Message){
    this.message = message;
    window.setTimeout( ()=>{
      this.message.text = '';
    }, 5000);
  }

  onSubmit(){

    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe( (user: User)=>{
        if(user){
          if(user.password === formData.password){
            window.localStorage.setItem('user',JSON.stringify(user));
            this.authService.login();
            this.message.text ='';
            this.router.navigate(['system', 'bill']);
          }else{
            this.showMessage({
              text: "Не верный пароль.",
              type: "danger"
            });
          }
        }else{
          this.showMessage({
            text:"Пользователь не зарегистрирован.",
            type: "danger"
          });
        }
      });
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.rout.queryParams
      .subscribe((params: Params)=>{
        if(params['nowCanLogin']){
          this.showMessage({
            text: 'Теперь вы можете зайти в систему', 
            type: 'success'
          });
        }
      });
    
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

}
