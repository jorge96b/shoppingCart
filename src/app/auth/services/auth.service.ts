import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService{

  userData: any;

  constructor(public afAuth: AngularFireAuth, private router:Router,private afs: AngularFirestore) {}


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
    this.afAuth.authState.subscribe(user => {
      this.userData = user;
      console.log(this.userData.uid);
      return this.userData;
    })
  }

  getDataUser(id:string){
    return this.afs.collection('Clientes').doc(id).valueChanges();
  }

}