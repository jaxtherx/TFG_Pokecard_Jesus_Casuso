import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js/core';
import 'crypto-js/aes';
import { Lusuario } from '../interfaces/lusuario';
import { enviromentLocal } from '../enviroments/enviromentLocal';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  public key:string = enviromentLocal.secret

  constructor() { }

  //Guarda el usuario encriptado en el session storage
  guardarUsuario(usuario:Lusuario){
    try{
    const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(usuario), this.key).toString();
      sessionStorage.clear();
      window.sessionStorage.setItem('usuario', encryptedObject);

      return true;
    } catch (error) {
      console.log('Error en local... ', error);
      return false;
    }
  }
  //Recupera el usuario del session storage
  public recuperarUsuario(): Lusuario {
    const encryptedObject = sessionStorage.getItem('usuario');
    let decryptedObject!:Lusuario;
    if(encryptedObject){
      const bytes = CryptoJS.AES.decrypt(encryptedObject!, this.key);
       decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return decryptedObject;
  }

  //Borra el session storage
  borrarSession(){
    sessionStorage.clear()
  }

}