import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2'
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
      this.alert('Error!','Usuario o contraseña invalida intentalo nuevamente','error','Reintentar');
    })
  }

  async register(email: string, password: string){
    try {
      this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((result) => {
        this.saveUser(result.user);
        this.alert('Gracias por registrarte!','Registro exitoso','success','Ingresar');
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.alert('Error!','Datos de ingresos invalidos intentalo nuevamente','error','Reintentar');
      })
    } catch (error) {
      this.alert('Error!','Datos de ingresos invalidos intentalo nuevament','error','Reintentar');
    }
  }

  saveUser(user:any){
    this.afAuth.authState.subscribe(user => {
      if(user !== null){
        const uai=user.uid;
        const loginUser = {
          email : user.email
        }
        this.afs.collection('Clientes').doc(uai).set(loginUser).then(() =>{});
      }
    })
  }

  async logout(): Promise<void> {

    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    })

  }

  getCurrentUser(){
    this.afAuth.authState.subscribe(user => {
      this.userData = user;
      return this.userData;
    })
  }

  getDataUser(id:string){
    return this.afs.collection('Clientes').doc(id).valueChanges();
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