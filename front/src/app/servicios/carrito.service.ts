import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Restmessage } from '../interfaces/restmessage';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private peticion:HttpClient, private router:Router) { }

  agregarProducto(usuario_id:number, producto_id:number, cantidad:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/carrito/agregarProducto`,{usuario_id, producto_id, cantidad}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }
  actualizarCantidad(usuario_id:number, producto_id:number, cantidad:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/carrito/actualizarCantidad`,{usuario_id, producto_id, cantidad}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }
  eliminarProducto(usuario_id:number, producto_id:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/carrito/eliminarProducto`,{usuario_id, producto_id}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }
  obtenerCarrito(usuario_id:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/carrito/obtenerCarrito`,{usuario_id}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }
  cantidadTotal(usuario_id:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/carrito/cantidadTotal`,{usuario_id}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }
  finalizarCompra(usuario_id:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/carrito/finalizarCompra`,{usuario_id}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }

}
