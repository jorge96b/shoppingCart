import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})

export class NavbarComponent {

  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService, private router: Router){

  }

  async logout(){
    try{
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    catch(error){
      console.log(error);
    }
  }
}
