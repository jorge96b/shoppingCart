import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(fb: FormBuilder, private authService:AuthService, private router: Router) { 
    this.registerForm = fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  async login(){
    console.log(this.registerForm);
    const{email,password} = this.registerForm.value;
    try{
      const user = await this.authService.login(email,password);
      if(user){
        console.log(user);
        this.router.navigate(['/productos']);
      }
    }catch(error){
      console.log(error);
    }
  }
}
