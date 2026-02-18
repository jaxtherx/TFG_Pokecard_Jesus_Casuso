import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Restmessage } from '../interfaces/restmessage';
import { Producto } from '../interfaces/producto';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private peticion:HttpClient, private router:Router) { }

  Login(email:string, passwd:string):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/login/login`,{email, passwd}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
       if (error.status === 401) {

         return new Observable<Restmessage>((subscriber)=>{
           subscriber.next({codigo:401,mensaje:'credenciales erroneas',error:'Unauthorized'});
         });
       } else {
        //Notificacion
         this.router.navigate(['home'])
         return new Observable<Restmessage>((subscriber)=>{
           subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
         });
       }
     }));

  }
  Registro(nombre:string, email:string, passwd:string):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/login/registro`,{nombre, email, passwd}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
       if (error.status === 401) {

         return new Observable<Restmessage>((subscriber)=>{
           subscriber.next({codigo:401,mensaje:'credenciales erroneas',error:'Unauthorized'});
         });
       } else {
        //Notificacion
         this.router.navigate(['home'])
         return new Observable<Restmessage>((subscriber)=>{
           subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
         });
       }
     }));

  }
  cambiarContrasena(id:number, passwd:string):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/login/cambiarContrasena`,{id, passwd}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
       if (error.status === 401) {

         return new Observable<Restmessage>((subscriber)=>{
           subscriber.next({codigo:401,mensaje:'credenciales erroneas',error:'Unauthorized'});
         });
       } else {
        //Notificacion
         this.router.navigate(['home'])
         return new Observable<Restmessage>((subscriber)=>{
           subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
         });
       }
     }));

  }
}
