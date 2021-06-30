import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.registerForm = fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm);
    const {email,password} = this.registerForm.value;
    try{
      this.authService.register(email,password);
    }catch(error){
      console.log(error);
    }
  }

  alert(title:string,text:string,icon:any,confie:string){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: confie
    })
  }

}
