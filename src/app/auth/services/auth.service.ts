import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService{

  constructor(public afAuth: AngularFireAuth, private router:Router) {}


  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }


  async login(email: string, password: string) {

    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      return user
    }).catch((error) => {
      alert('Se presento un error intentalo nuevamente');
    })
  }

  async register(email: string, password: string){
    try {
      await this.afAuth.createUserWithEmailAndPassword(email,password);
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Se presento un error intentalo nuevamente');
    }
  }

  async logout(): Promise<void> {

    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    })

  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}